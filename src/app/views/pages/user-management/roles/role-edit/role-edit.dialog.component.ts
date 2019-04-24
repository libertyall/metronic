import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';
import { each, find, some } from 'lodash';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { delay } from 'rxjs/operators';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';
import { Permission } from '../../../../../core/auth/_interfaces/permission.interface';
import { selectLastCreatedRoleId, selectRoleById } from '../../../../../core/auth/_selectors/role.selectors';
import { selectAllPermissions } from '../../../../../core/auth/_selectors/permission.selectors';
import { RoleOnServerCreated, RoleUpdated } from '../../../../../core/auth/_actions/role.actions';

@Component({
	selector: 'kt-role-edit-dialog',
	templateUrl: './role-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class RoleEditDialogComponent implements OnInit, OnDestroy {

	role: Role;
	role$: Observable<Role>;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;
	allPermissions$: Observable<Permission[]>;
	rolePermissions: Permission[] = [];

	private componentSubscriptions: Subscription;

	constructor(public dialogRef: MatDialogRef<RoleEditDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any,
				private store: Store<AppState>) {
	}

	ngOnInit() {
		if (this.data.roleId) {
			this.role$ = this.store.pipe(select(selectRoleById(this.data.roleId)));
		} else {
			const newRole: Role = {
				id: '',
				permissions: [],
				title: '',
				isCoreRole: false
			};
			this.role$ = of(newRole);
		}

		this.role$.subscribe(res => {
			if (!res) {
				return;
			}

			this.role = res;
			this.allPermissions$ = this.store.pipe(select(selectAllPermissions));
			this.loadPermissions();
		});
	}

	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	loadPermissions() {
		this.allPermissions$.subscribe(_allPermissions => {
			if (!_allPermissions) {
				return;
			}

			const mainPermissions = _allPermissions.filter(element => !element.parentId);
			mainPermissions.forEach((element: Permission) => {
				const hasUserPermission = this.role.permissions.some(t => t === element.id);
				const rootPermission: Permission = {
					id: element.id,
					level: element.level,
					parentId: element.parentId,
					isSelected: hasUserPermission,
					_children: [],
					title: element.title,
					name: element.name
				};

				const children = _allPermissions.filter(ele => ele.parentId && ele.parentId === element.id);
				children.forEach(child => {
					const hasUserChildPermission = this.role.permissions.some(t => t === child.id);
					const childPermission: Permission = {
						id: child.id,
						level: child.level,
						parentId: child.parentId,
						isSelected: hasUserChildPermission,
						_children: [],
						title: child.title,
						name: child.name
					};
					rootPermission._children.push(childPermission);
				});
				this.rolePermissions.push(rootPermission);
			});
		});
	}

	preparePermissionIds(): string[] {
		const result = [];
		each(this.rolePermissions, (_root: Permission) => {
			if (_root.isSelected) {
				result.push(_root.id);
				each(_root._children, (_child: Permission) => {
					if (_child.isSelected) {
						result.push(_child.id);
					}
				});
			}
		});
		return result;
	}

	prepareRole(): Role {
		return {
			id: this.role.id,
			permissions: this.preparePermissionIds(),
			title: this.role.title,
			isCoreRole: this.role.isCoreRole
		};
	}


	onSubmit() {
		this.hasFormErrors = false;
		this.loadingAfterSubmit = false;
		if (!this.isTitleValid()) {
			this.hasFormErrors = true;
			return;
		}

		const editedRole = this.prepareRole();
		if (editedRole.id) {
			this.updateRole(editedRole);
		} else {
			this.createRole(editedRole);
		}
	}

	updateRole(_role: Role) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.store.dispatch(new RoleUpdated({
			role: _role
		}));
		this.viewLoading = false;
		this.dialogRef.close({
			_role,
			isEdit: true
		});
	}

	createRole(_role: Role) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.store.dispatch(new RoleOnServerCreated({ role: _role }));
		this.componentSubscriptions = this.store.pipe(
			delay(1000), // Remove this line
			select(selectLastCreatedRoleId)
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.viewLoading = false;
			this.dialogRef.close({
				_role,
				isEdit: false
			});
		});
	}

	onAlertClose() {
		this.hasFormErrors = false;
	}

	isSelectedChanged($event, permission: Permission) {
		if (permission._children.length === 0 && permission.isSelected) {
			const _root = find(this.rolePermissions, (item: Permission) => item.id === permission.parentId);
			if (_root && !_root.isSelected) {
				_root.isSelected = true;
			}
			return;
		}

		if (permission._children.length === 0 && !permission.isSelected) {
			const _root = find(this.rolePermissions, (item: Permission) => item.id === permission.parentId);
			if (_root && _root.isSelected) {
				if (!some(_root._children, (item: Permission) => item.isSelected === true)) {
					_root.isSelected = false;
				}
			}
			return;
		}

		if (permission._children.length > 0 && permission.isSelected) {
			each(permission._children, (item: Permission) => item.isSelected = true);
			return;
		}

		if (permission._children.length > 0 && !permission.isSelected) {
			each(permission._children, (item: Permission) => {
				item.isSelected = false;
			});
			return;
		}
	}

	getTitle(): string {
		if (this.role && this.role.id) {
			return `Edit role '${ this.role.title }'`;
		}
		return 'New role';
	}

	isTitleValid(): boolean {
		return (this.role && this.role.title && this.role.title.length > 0);
	}
}

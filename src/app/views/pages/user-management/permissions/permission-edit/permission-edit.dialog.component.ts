import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Permission } from '../../../../../core/auth/_interfaces/permission.interface';
import { Observable, of, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import {
	selectAllPermissions, selectLastCreatedPermissionId, selectPermissionById
} from '../../../../../core/auth/_selectors/permission.selectors';
import { PermissionOnServerCreated, PermissionUpdated } from '../../../../../core/auth/_actions/permission.actions';
import { each, find, some } from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'kt-permission-edit',
	templateUrl: './permission-edit.dialog.component.html',
	styleUrls: ['./permission-edit.dialog.component.scss']
})
export class PermissionEditDialogComponent implements OnInit, OnDestroy {

	permission: Permission;
	allPermissions: Permission[];
	permission$: Observable<Permission>;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;
	allPermissions$: Observable<Permission[]>;
	permissionPermissions: Permission[] = [];

	form: FormGroup;

	private componentSubscriptions: Subscription;

	constructor(public dialogRef: MatDialogRef<PermissionEditDialogComponent>,
				private translate: TranslateService,
				private fb: FormBuilder,
				private alertService: AlertService,
				@Inject(MAT_DIALOG_DATA) public data: any,
				private store: Store<AppState>) {
	}

	ngOnInit() {
		this.viewLoading = true;
		if (this.data.permissionId) {
			this.permission$ = this.store.pipe(select(selectPermissionById(this.data.permissionId)));
		} else {
			const newPermission: Permission = {
				id: '',
				title: '',
				name: '',
				level: 0,
				parentId: '',
				isSelected: false,
				_children: []
			};
			this.permission$ = of(newPermission);
		}

		this.permission$.subscribe(res => {
			if (!res) {
				return;
			}

			this.permission = res;
			this.allPermissions$ = this.store.pipe(select(selectAllPermissions));
			this.loadPermissions();
		});

		this.initForm();
	}

	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	initForm() {
		this.form = this.fb.group({
			name: [this.permission.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
			level: this.permission.level,
			isSelected: this.permission.isSelected,
			parentId: this.permission.parentId,
			_children: this.permission._children,
			title: this.permission.title
		});

		this.form.valueChanges.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe((changes: any) => {
			if (this.form.valid) {
				this.permission = Object.assign({}, this.permission, changes);
			}
		});
	}

	loadPermissions() {
		this.allPermissions$.subscribe(_allPermissions => {
			this.allPermissions = _allPermissions;
			this.viewLoading = false;
			/* const mainPermissions = _allPermissions.filter(element => !element.parentId);
			 mainPermissions.forEach((element: Permission) => {
			 console.log(element.id);
			 const hasUserPermission = this.permission.permissions.some(t => t === element.id);
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
			 const hasUserChildPermission = this.permission.permissions.some(t => t === child.id);
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
			 this.permissionPermissions.push(rootPermission);
			 }); */
		});
	}

	preparePermissionIds(): string[] {
		const result = [];
		each(this.permissionPermissions, (_root: Permission) => {
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

	preparePermission(): Permission {
		return {
			id: this.permission.id,
			name: this.permission.name,
			level: this.permission.level,
			isSelected: this.permission.isSelected,
			parentId: this.permission.parentId,
			_children: this.permission._children,
			title: this.permission.title
		};
	}


	onSubmit(): Observable<Permission> {
		this.hasFormErrors = false;
		this.loadingAfterSubmit = false;
		if (!this.isTitleValid()) {
			this.hasFormErrors = true;
			return;
		}

		const editedPermission = this.preparePermission();
		if (editedPermission.id) {
			this.updatePermission(editedPermission);
		} else {
			this.createPermission(editedPermission);
		}
	}

	updatePermission(_permission: Permission) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.store.dispatch(new PermissionUpdated({
			permission: _permission
		}));
		this.viewLoading = false;
		this.dialogRef.close({
			_permission,
			isEdit: true
		});
	}

	createPermission(_permission: Permission) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.store.dispatch(new PermissionOnServerCreated({ permission: _permission }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedPermissionId)
		).subscribe(res => {
			console.log(res);
			if (!res) {
				return;
			}

			this.viewLoading = false;
			this.dialogRef.close({
				_permission,
				isNew: false
			});
		});
	}

	onAlertClose() {
		this.hasFormErrors = false;
	}

	isSelectedChanged($event, permission: Permission) {
		if (permission._children.length === 0 && permission.isSelected) {
			const _root = find(this.permissionPermissions, (item: Permission) => item.id === permission.parentId);
			if (_root && !_root.isSelected) {
				_root.isSelected = true;
			}
			return;
		}

		if (permission._children.length === 0 && !permission.isSelected) {
			const _root = find(this.permissionPermissions, (item: Permission) => item.id === permission.parentId);
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
		if (this.permission && this.permission.id) {
			return this.translate.instant('user.permission.dialog.title.edit', { permission: this.permission.title });
		}
		return this.translate.instant('user.permission.dialog.title.new');
	}

	isTitleValid(): boolean {
		console.log(this.permission);
		return (this.permission && this.permission.title && this.permission.title.length > 0);
	}

}

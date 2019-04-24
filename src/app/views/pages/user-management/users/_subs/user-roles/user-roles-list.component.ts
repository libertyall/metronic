import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { each, find, remove } from 'lodash';
import { AppState } from '../../../../../../core/reducers';
import { Role } from '../../../../../../core/auth/_interfaces/role.interface';
import { selectAllRoles } from '../../../../../../core/auth/_selectors/role.selectors';

@Component({
	selector: 'kt-user-roles-list',
	templateUrl: './user-roles-list.component.html'
})
export class UserRolesListComponent implements OnInit {

	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() rolesSubject: BehaviorSubject<string[]>;

	allUserRoles$: Observable<Role[]>;
	allRoles: Role[] = [];
	unassignedRoles: Role[] = [];
	assignedRoles: Role[] = [];
	roleIdForAdding: string;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit() {
		this.allUserRoles$ = this.store.pipe(select(selectAllRoles));
		this.allUserRoles$.subscribe((res: Role[]) => {
			each(res, (_role: Role) => {
				this.allRoles.push(_role);
				this.unassignedRoles.push(_role);
			});

			each(this.rolesSubject.value, (roleId: string) => {
				const role = find(this.allRoles, (_role: Role) => {
					return _role.id === roleId;
				});

				if (role) {
					this.assignedRoles.push(role);
					remove(this.unassignedRoles, role);
				}
			});
		});
	}

	assignRole() {

		if (this.roleIdForAdding === '') {
			return;
		}

		const role = find(this.allRoles, (_role: Role) => {
			return _role.id === this.roleIdForAdding;
		});

		if (role) {
			this.assignedRoles.push(role);
			remove(this.unassignedRoles, role);
			this.roleIdForAdding = '';
			this.updateRoles();
		}
	}

	unassingRole(role: Role) {
		this.roleIdForAdding = '';
		this.unassignedRoles.push(role);
		remove(this.assignedRoles, role);
		this.updateRoles();
	}

	updateRoles() {
		const _roles = [];
		each(this.assignedRoles, elem => _roles.push(elem.id));
		this.rolesSubject.next(_roles);
	}
}

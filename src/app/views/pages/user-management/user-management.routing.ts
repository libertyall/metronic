import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserResolver } from './user.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { PermissionsListComponent } from './permissions/permissions-list/permissions-list.component';

export const userManagementRoutes: Routes = [
	{
		path: '',
		component: UserManagementComponent,
		children: [
			{
				path: 'dashboard',
				component: UserDashboardComponent
			},
			{
				path: 'permissions',
				component: PermissionsListComponent
			},
			{
				path: 'roles',
				component: RolesListComponent
			},
			{
				path: 'list',
				component: UsersListComponent
			},
			{
				path: 'detail/:userId',
				component: UserDetailComponent,
				resolve: {
					user: UserResolver
				}
			},
			/*
			 {
			 path: 'users/add',
			 component: UserEditComponent
			 },
			 {
			 path: 'users/add:id',
			 component: UserEditComponent
			 },*/
			{
				path: 'edit/:userId',
				component: UserEditComponent,
				resolve: {
					user: UserResolver
				}
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

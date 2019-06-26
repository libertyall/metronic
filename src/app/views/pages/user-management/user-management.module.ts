import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { PartialsModule } from '../../partials/partials.module';
import { ActionNotificationComponent } from '../../partials/content/crud';
import { UserManagementComponent } from './user-management.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RoleEditDialogComponent } from './roles/role-edit/role-edit.dialog.component';
import { UserRolesListComponent } from './users/_subs/user-roles/user-roles-list.component';
import { ChangePasswordComponent } from './users/_subs/change-password/change-password.component';
import { AddressComponent } from './users/_subs/address/address.component';
import { SocialNetworksComponent } from './users/_subs/social-networks/social-networks.component';
import {
	MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
	MatExpansionModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
	MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule,
	MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { userManagementRoutes } from './user-management.routing';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from '../../../core/auth/_reducers/user.reducers';
import { UserEffects } from '../../../core/auth/_effects/user.effects';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserResolver } from './user.resolver';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		PartialsModule,
		RouterModule.forChild(userManagementRoutes),
		StoreModule.forFeature('users', usersReducer),
		EffectsModule.forFeature([UserEffects]),
		FormsModule,
		PortletModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		SharedModule
	],
	providers: [
		UserService,
		UserResolver
		/* InterceptService,
		 {
		 provide: HTTP_INTERCEPTORS,
		 useClass: InterceptService,
		 multi: true
		 },
		 {
		 provide: MAT_DIALOG_DEFAULT_OPTIONS,
		 useValue: {
		 hasBackdrop: true,
		 panelClass: 'kt-mat-dialog-container__wrapper',
		 height: 'auto',
		 width: '900px'
		 }
		 },
		 HttpUtilsService,
		 TypesUtilsService,
		 LayoutUtilsService */
	],
	entryComponents: [
		ActionNotificationComponent,
		RoleEditDialogComponent
	],
	declarations: [
		UserManagementComponent,
		UsersListComponent,
		UserEditComponent,
		RolesListComponent,
		RoleEditDialogComponent,
		UserRolesListComponent,
		ChangePasswordComponent,
		AddressComponent,
		SocialNetworksComponent,
		UserDashboardComponent,
		UserDetailComponent
	]
})
export class UserManagementModule {
}

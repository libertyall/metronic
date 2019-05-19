import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InterceptService } from '../../../core/_base/crud/';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { UnAuthGuard } from '../../../core/auth/_guards/unauth.guard';
import { AuthService } from '../../../core/auth/_services/auth.service';
import { AuthGuard } from '../../../core/auth/_guards/auth.guard';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { EmailHandlerEffects } from '../../../core/auth/_effects/email-handler.effects';
import { LoginEffects } from '../../../core/auth/_effects/login.effects';
import { ReAuthenticationEffects } from '../../../core/auth/_effects/re-authentication.effects';
import { RegistrationEffects } from '../../../core/auth/_effects/registration.effects';
import { ProvidersManagementEffects } from '../../../core/auth/_effects/providers-management.effects';
import { PasswordManagementEffects } from '../../../core/auth/_effects/password-management.effects';
import { reducers } from '../../../core/auth/_reducers/auth.reducer';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		canActivate: [UnAuthGuard],
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent
			}
		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', reducers),
		EffectsModule.forFeature([
			EmailHandlerEffects,
			LoginEffects,
			ReAuthenticationEffects,
			RegistrationEffects,
			ProvidersManagementEffects,
			PasswordManagementEffects
		])
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		ApplicationService
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard,
				UnAuthGuard
			]
		};
	}
}

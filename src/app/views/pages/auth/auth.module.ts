import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatInputModule,
	MatProgressSpinnerModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthNoticeComponent} from './auth-notice/auth-notice.component';
import {UnAuthGuard} from '../../../core/auth/_guards/unauth.guard';
import {AuthService} from '../../../core/auth/_services';
import {authRoutes} from './auth.routes';
import {authReducer} from '../../../core/auth/_reducers/auth.reducers';
import {AuthEffects} from '../../../core/auth/_effects/auth.effects';
import {usersReducer} from '../../../core/auth/_reducers/user.reducers';
import {UserEffects} from '../../../core/auth/_effects/user.effects';
import {SplashScreenComponent} from '../../partials/layout';
import {EntityDataModule} from '@ngrx/data';
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(authRoutes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
		StoreModule.forFeature('users', usersReducer),
		EffectsModule.forFeature([AuthEffects, UserEffects]),
		// PartialsModule
		EntityDataModule,
		MatProgressSpinnerModule
	],
	providers: [
		/*InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		}*/
	],
	exports: [AuthComponent, SplashScreenComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent,
		SplashScreenComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				UnAuthGuard,
				AngularFireAuthGuard
			]
		};
	}
}

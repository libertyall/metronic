import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { AuthService } from '../../../core/auth/_services';
import { AuthGuard } from '../../../core/auth/_guards/auth.guard';
import { PartialsModule } from '../../partials/partials.module';
import { authRoutes } from './auth.routes';
import { authReducer } from '../../../core/auth/_reducers/auth.reducers';
import { AuthEffects } from '../../../core/auth/_effects/auth.effects';
import {usersReducer} from '../../../core/auth/_reducers/user.reducers';
import {UserEffects} from '../../../core/auth/_effects/user.effects';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(authRoutes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([AuthEffects])
		// StoreModule.forFeature('users', usersReducer),
		// EffectsModule.forFeature([AuthEffects, UserEffects]),
		// PartialsModule
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		}
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

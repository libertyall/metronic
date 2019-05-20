import { Action } from '@ngrx/store';
import { IUser } from '../_interfaces/user.interface';

export enum AuthActionTypes {
	Authenticated               = '[Auth] Authenticated',
	AuthError                   = '[Auth] Error',
	CredentialsLogin            = '[Auth] Credentials Login Attempt',
	CredentialsReAuthentication = '[Auth] Credentials ReAuthentication attempt',
	CredentialsRegistration     = '[Auth] Credentials Registration Attempt',
	DeleteAccount               = '[Auth] Delete Account',
	DeleteAccountSuccess        = '[Auth] Delete Account Success',
	DeleteAccountError          = '[Auth] Delete Account Error',
	FacebookLogin               = '[Auth] Facebook Login Attempt',
	FacebookReAuthentication    = '[Auth] Facebook ReAuthentication Attempt',
	FacebookRegistration        = '[Auth] Facebook Registration Attempt',
	TwitterLogin                = '[Auth] Twitter Login Attempt',
	TwitterReAuthentication     = '[Auth] Twitter ReAuthentication Attempt',
	TwitterRegistration         = '[Auth] Twitter Registration Attempt',
	GetUser                     = '[Auth] Get User',
	GoogleLogin                 = '[Auth] Google Login Attempt',
	GoogleReAuthentication      = '[Auth] Google ReAuthentication Attempt',
	GoogleRegistration          = '[Auth] Google Registration Attempt',
	Logout                      = '[Auth] Logout',
	NotAuthenticated            = '[Auth] Not Authenticated',
	SendVerificationEmail       = '[Auth] Send Verification Email',
	ReAuthenticationError       = '[Auth] ReAuthentication Error',
	ReAuthenticationSuccess     = '[Auth] ReAuthentication Success',
	RefreshToken                = '[Auth] ReFresh Token',
	RegistrationSuccess         = '[Auth] Registration Success',
	ResetAuthState              = '[Auth] Reset State',
	VerificationEmailError      = '[Auth] Verification Email Error',
	VerificationEmailSent       = '[Auth] Verification Email Sent'
}

export class GetUser implements Action {
	readonly type = AuthActionTypes.GetUser;

	constructor(public payload?: any) {
	}
}

export class Authenticated implements Action {
	readonly type = AuthActionTypes.Authenticated;

	constructor(public payload: { user: IUser }) {
	}
}

export class NotAuthenticated implements Action {
	readonly type = AuthActionTypes.NotAuthenticated;

	constructor(public payload?: any) {
	}
}

export class AuthError implements Action {
	readonly type = AuthActionTypes.AuthError;

	constructor(public payload?: any) {
	}
}

export class GoogleRegistration implements Action {
	readonly type = AuthActionTypes.GoogleRegistration;

	constructor(public payload?: any) {
	}
}

export class TwitterRegistration implements Action {
	readonly type = AuthActionTypes.TwitterRegistration;

	constructor(public payload?: any) {
	}
}

export class FacebookRegistration implements Action {
	readonly type = AuthActionTypes.FacebookRegistration;

	constructor(public payload?: any) {
	}
}

export class CredentialsRegistration implements Action {
	readonly type = AuthActionTypes.CredentialsRegistration;

	constructor(public payload: any) {
	}
}

export class RegistrationSuccess implements Action {
	readonly type = AuthActionTypes.RegistrationSuccess;

	constructor(public payload: { user: IUser }) {
	}
}

export class Logout implements Action {
	readonly type = AuthActionTypes.Logout;

	constructor(public payload?: any) {
	}
}

export class GoogleLogin implements Action {
	readonly type = AuthActionTypes.GoogleLogin;

	constructor(public payload?: any) {
	}
}

export class FacebookLogin implements Action {
	readonly type = AuthActionTypes.FacebookLogin;

	constructor(public payload?: any) {
	}
}

export class TwitterLogin implements Action {
	readonly type = AuthActionTypes.TwitterLogin;

	constructor(public payload?: any) {
	}
}

export class CredentialsLogin implements Action {
	readonly type = AuthActionTypes.CredentialsLogin;

	constructor(public email: string, public password: string, public remember?: boolean) {
	}
}

export class GoogleReAuthentication implements Action {
	readonly type = AuthActionTypes.GoogleReAuthentication;

	constructor(public payload?: any) {
	}
}

export class FacebookReAuthentication implements Action {
	readonly type = AuthActionTypes.FacebookReAuthentication;

	constructor(public payload?: any) {
	}
}

export class TwitterReAuthentication implements Action {
	readonly type = AuthActionTypes.TwitterReAuthentication;

	constructor(public payload?: any) {
	}
}

export class CredentialsReAuthentication implements Action {
	readonly type = AuthActionTypes.CredentialsReAuthentication;

	constructor(public email: string, public password: string, public remember?: boolean) {
	}
}

export class ReAuthenticationSuccess implements Action {
	readonly type = AuthActionTypes.ReAuthenticationSuccess;

	constructor() {
	}
}

export class ReAuthenticationError implements Action {
	readonly type = AuthActionTypes.ReAuthenticationError;

	constructor(public payload?: any) {
	}
}

export class SendVerificationEmail implements Action {
	readonly type = AuthActionTypes.SendVerificationEmail;

	constructor(public payload: { redirectUrl: string }) {
	}
}

export class VerificationEmailError implements Action {
	readonly type = AuthActionTypes.VerificationEmailError;

	constructor(public payload: { code: string, message: string }) {
	}
}

export class VerificationEmailSent implements Action {
	readonly type = AuthActionTypes.VerificationEmailSent;

	constructor() {
	}
}

export class DeleteAccount implements Action {
	readonly type = AuthActionTypes.DeleteAccount;

	constructor() {
	}
}

export class DeleteAccountSuccess implements Action {
	readonly type = AuthActionTypes.DeleteAccountSuccess;

	constructor() {
	}

}

export class DeleteAccountError implements Action {
	readonly type = AuthActionTypes.DeleteAccountError;

	constructor(public payload: { code: string; message: string; }) {
	}

}

export class ResetAuthState implements Action {
	readonly type = AuthActionTypes.ResetAuthState;
}

export class RefreshToken implements Action {
	readonly type = AuthActionTypes.RefreshToken;

}

export type AuthActions
	= GetUser
	| Authenticated
	| NotAuthenticated
	| ReAuthenticationSuccess
	| ReAuthenticationError
	| GoogleReAuthentication
	| FacebookReAuthentication
	| TwitterReAuthentication
	| CredentialsReAuthentication
	| GoogleLogin
	| FacebookLogin
	| TwitterLogin
	| CredentialsLogin
	| AuthError
	| Logout
	| GoogleRegistration
	| FacebookRegistration
	| TwitterRegistration
	| CredentialsRegistration
	| RegistrationSuccess
	| SendVerificationEmail
	| VerificationEmailSent
	| VerificationEmailError
	| DeleteAccount
	| DeleteAccountError
	| DeleteAccountSuccess
	| ResetAuthState
	| RefreshToken;

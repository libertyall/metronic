import {Action} from '@ngrx/store';

export enum EmailHandlerActionTypes {
	CheckActionCode = '[Auth/EmailHandler] Check Action Code',
	CheckActionCodeError = '[Auth/EmailHandler] Check Action Code Error',
	CheckActionCodeSuccess = '[Auth/EmailHandler] Check Action Code Success',
	RecoverEmail = '[Auth/EmailHandler] Recover Email',
	RecoverEmailSuccess = '[Auth/EmailHandler] Recover Email Success',
	RecoverEmailError = '[Auth/EmailHandler] Recover Email Error',
	ResetPassword = '[Auth/EmailHandler] Reset Password',
	ResetPasswordSuccess = '[Auth/EmailHandler] Reset Password Success',
	ResetPasswordError = '[Auth/EmailHandler] Reset Password Error',
	VerifyEmailAddress = '[Auth/EmailHandler] Verify Email Address',
	VerifyEmailAddressSuccess = '[Auth/EmailHandler] Verify Email Address Success',
	VerifyEmailAddressError = '[Auth/EmailHandler] Verify Email Address Error',
	VerifyPasswordResetCode = '[Auth/EmailHandler] Verify Password Reset Code',
	VerifyPasswordResetCodeError = '[Auth/EmailHandler] Verify Password Reset Error',
	VerifyPasswordResetCodeSuccess = '[Auth/EmailHandler] Verify Password Reset Success'
}

export class CheckActionCode implements Action {
	readonly type = EmailHandlerActionTypes.CheckActionCode;

	constructor(public payload: { actionCode: string }) {
	}
}

export class CheckActionCodeError implements Action {
	readonly type = EmailHandlerActionTypes.CheckActionCodeError;

	constructor(public payload: { code: string, message: string }) {
	}
}

export class CheckActionCodeSuccess implements Action {
	readonly type = EmailHandlerActionTypes.CheckActionCodeSuccess;

	constructor(public payload: { actionCode: string, restoredEmail: string }) {
	}
}

export class RecoverEmail implements Action {
	readonly type = EmailHandlerActionTypes.RecoverEmail;

	constructor(public payload: { actionCode: string}) {
	}
}

export class RecoverEmailError implements Action {
	readonly type = EmailHandlerActionTypes.RecoverEmailError;

	constructor(public payload: { code: string, message: string }) {
	}
}

export class RecoverEmailSuccess implements Action {
	readonly type = EmailHandlerActionTypes.RecoverEmailSuccess;

}

export class ResetPassword implements Action {
	readonly type = EmailHandlerActionTypes.ResetPassword;

	constructor(public payload: { actionCode: string, newPassword: string }) {
	}
}

export class ResetPasswordError implements Action {
	readonly type = EmailHandlerActionTypes.ResetPasswordError;

	constructor(public payload: { code: string, message: string }) {
	}
}

export class ResetPasswordSuccess implements Action {
	readonly type = EmailHandlerActionTypes.ResetPasswordSuccess;

}

export class VerifyEmailAddress implements Action {
	readonly type = EmailHandlerActionTypes.VerifyEmailAddress;

	constructor(public payload: { actionCode: string}) {
	}
}

export class VerifyEmailAddressError implements Action {
	readonly type = EmailHandlerActionTypes.VerifyEmailAddressError;

	constructor(public payload: { code: string, message: string }) {
	}
}

export class VerifyEmailAddressSuccess implements Action {
	readonly type = EmailHandlerActionTypes.VerifyEmailAddressSuccess;

}

export class VerifyPasswordResetCode implements Action {
	readonly type = EmailHandlerActionTypes.VerifyPasswordResetCode;

	constructor(public payload: { actionCode: string }) {
	}
}

export class VerifyPasswordResetCodeError implements Action {
	readonly type = EmailHandlerActionTypes.VerifyPasswordResetCodeError;

	constructor(public payload: { code: string, message: string }) {
	}
}

export class VerifyPasswordResetCodeSuccess implements Action {
	readonly type = EmailHandlerActionTypes.VerifyPasswordResetCodeSuccess;

	constructor(public payload: { email: string, actionCode: string }) {
	}
}

export type EmailHandlerActions = CheckActionCode
	| CheckActionCodeError
	| CheckActionCodeSuccess
	| RecoverEmail
	| RecoverEmailSuccess
	| RecoverEmailError
	| ResetPassword
	| ResetPasswordSuccess
	| ResetPasswordError
	| VerifyEmailAddress
	| VerifyEmailAddressError
	| VerifyEmailAddressSuccess
	| VerifyPasswordResetCode
	| VerifyPasswordResetCodeError
	| VerifyPasswordResetCodeSuccess;

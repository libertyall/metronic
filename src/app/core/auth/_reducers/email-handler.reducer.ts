import { EmailHandlerActions, EmailHandlerActionTypes } from '../_actions/email-handler.actions';

const initialRequestStatus = {
	loading: false,
	success: false,
	error: null
};

export interface State {
	emailVerified: {
		loading: boolean;
		success: boolean;
		error: {
			code: string;
			message: string
		};
	};
	passwordResetCode: {
		email: string;
		loading: boolean;
		success: boolean;
		error: {
			code: string;
			message: string
		};
	};
	resetPassword: {
		loading: boolean;
		success: boolean;
		error: {
			code: string;
			message: string
		};
	};
	checkCode: {
		loading: boolean;
		success: boolean;
		error: {
			code: string;
			message: string
		};
	};
	recoverEmail: {
		loading: boolean;
		success: boolean;
		error: {
			code: string;
			message: string
		};
	};
}

const initialState = {
	emailVerified: { ...initialRequestStatus },
	passwordResetCode: { ...initialRequestStatus },
	resetPassword: { ...initialRequestStatus },
	checkCode: { ...initialRequestStatus },
	recoverEmail: { ...initialRequestStatus }
} as State;

export function reducer(state = initialState, action: EmailHandlerActions): State {
	switch (action.type) {

		case EmailHandlerActionTypes.VerifyEmailAddress: {
			return { ...state, emailVerified: { loading: true, success: false, error: null } };
		}

		case EmailHandlerActionTypes.VerifyEmailAddressError: {
			return { ...state, emailVerified: { loading: false, success: false, error: action.payload } };
		}

		case EmailHandlerActionTypes.VerifyEmailAddressSuccess: {
			return { ...state, emailVerified: { loading: false, success: true, error: null } };
		}

		case EmailHandlerActionTypes.VerifyPasswordResetCode: {
			return { ...state, passwordResetCode: { email: null, loading: true, success: false, error: null } };
		}

		case EmailHandlerActionTypes.VerifyPasswordResetCodeError: {
			return {
				...state, passwordResetCode: { email: null, loading: false, success: false, error: action.payload }
			};
		}

		case EmailHandlerActionTypes.VerifyPasswordResetCodeSuccess: {
			return {
				...state, passwordResetCode: { email: action.payload.email, loading: false, success: true, error: null }
			};
		}

		case EmailHandlerActionTypes.CheckActionCode: {
			return { ...state, checkCode: { loading: true, success: false, error: null } };
		}

		case EmailHandlerActionTypes.CheckActionCodeError: {
			return { ...state, checkCode: { loading: false, success: false, error: action.payload } };
		}

		case EmailHandlerActionTypes.CheckActionCodeSuccess: {
			return { ...state, checkCode: { loading: false, success: true, error: null } };
		}

		case EmailHandlerActionTypes.RecoverEmail: {
			return { ...state, recoverEmail: { loading: true, success: false, error: null } };
		}

		case EmailHandlerActionTypes.RecoverEmailError: {
			return { ...state, recoverEmail: { loading: false, success: false, error: action.payload } };
		}

		case EmailHandlerActionTypes.RecoverEmailSuccess: {
			return { ...state, recoverEmail: { loading: false, success: true, error: null } };
		}

		case EmailHandlerActionTypes.ResetPassword: {
			return { ...state, resetPassword: { loading: true, success: false, error: null } };
		}

		case EmailHandlerActionTypes.ResetPasswordError: {
			return { ...state, resetPassword: { loading: false, success: false, error: action.payload } };
		}

		case EmailHandlerActionTypes.ResetPasswordSuccess: {
			return { ...state, resetPassword: { loading: false, success: true, error: null } };
		}
		default:
			return state;
	}
}

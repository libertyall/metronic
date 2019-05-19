import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';
import { IUser } from '../_interfaces/user.interface';
import { ProvidersManagementActions } from '../_actions/providers.management.actions';
import { EmailHandlerActions, EmailHandlerActionTypes } from '../_actions/email-handler.actions';

export type Action = AuthActions
	| ProvidersManagementActions
	| EmailHandlerActions;

export interface State {
	loggedIn: boolean;
	user: IUser | null;
	loading: boolean;
	error: {
		code: string;
		message: string;
	};
	success: boolean;
}

const defaultState = {
	loggedIn: false,
	user: null,
	loading: true,
	error: null,
	success: false
};


export function reducer(state: State = defaultState, action: Action): State {
	switch (action.type) {

		case AuthActionTypes.GetUser:
			return {...state, loading: true, success: false};

		case AuthActionTypes.Authenticated:
		case AuthActionTypes.RegistrationSuccess:
			return {...state, user: action.payload.user, loading: false, loggedIn: true, success: false};

		case AuthActionTypes.NotAuthenticated:
			return {...state, ...defaultState, loading: false, loggedIn: false, success: false};

		case AuthActionTypes.GoogleLogin:
		case AuthActionTypes.FacebookLogin:
		case AuthActionTypes.GoogleRegistration:
		case AuthActionTypes.FacebookRegistration:
		case AuthActionTypes.CredentialsLogin:
		case AuthActionTypes.CredentialsRegistration:
		case AuthActionTypes.FacebookReAuthentication:
		case AuthActionTypes.CredentialsReAuthentication:
		case AuthActionTypes.GoogleReAuthentication:
			return {...state, loading: true, success: false};

		case AuthActionTypes.ResetAuthState:
			return {...state, loading: false, success: false, error: null};

		case AuthActionTypes.AuthError:
		case AuthActionTypes.ReAuthenticationError:
			return {...state, loading: false, success: false, error: action.payload};
		case AuthActionTypes.ReAuthenticationSuccess:
			return {...state, loading: false, error: null, success: true};
		case AuthActionTypes.Logout:
			return {...state, loading: true};
		case AuthActionTypes.DeleteAccount:
			return {...state, loading: true, success: true, error: null};
		case AuthActionTypes.DeleteAccountError:
			return {...state, loading: false, success: false, error: action.payload};
		case AuthActionTypes.DeleteAccountSuccess:
			return {...state, loading: false, loggedIn: false, success: true, error: null, user: null};

		case EmailHandlerActionTypes.VerifyEmailAddressSuccess:
			return {...state, user: {...state.user, emailVerified: true}};

		default:
			return state;
	}
}

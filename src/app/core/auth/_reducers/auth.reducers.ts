import {
	acceptTerms,
	authMessage,
	credentialsLogin,
	credentialsLoginSuccess,
	facebookLoginSuccess,
	forgotPassword,
	getAuthUser, googleLoginSuccess,
	logout,
	logoutSuccess,
	register,
	registerSuccess,
	sendVerificationMail, setAuthUser,
	startLogin,
	startRegister,
	twitterLoginSuccess
} from '../_actions/auth.actions';
import {UserInterface} from '../_interfaces/user.interface';
import {Action, createReducer, on} from '@ngrx/store';

export interface AuthState {
	loggedIn: boolean;
	user: UserInterface;
	isLoading: boolean;
	message: {
		code?: string;
		color?: string;
	};
}

export const initialState: AuthState = {
	loggedIn: false,
	user: undefined,
	isLoading: false,
	message: {}
};

export const reducer = createReducer(
	initialState,

	on(authMessage, (state, action) => {
		return {...state, isLoading: false, message: {code: action.code, color: action.color}};
	}),

	on(setAuthUser, (state, action) => {
		return {...state, user: action.user, loggedIn: action.isLoggedIn};
	}),

	/**
	 * Login & Logout
	 */
	on(startLogin, (state, action) => {
		return {...state, isLoading: true, message: {}};
	}),

	/* on(credentialsLogin, (state, action) => {
		return {...state};
	}), */

	on(credentialsLoginSuccess, (state, action) => {
		return {...state, user: action.user, loggedIn: action.isLoggedIn, isLoading: false, message: {}};
	}),

	on(logout, (state, action) => {
		return {...initialState};
	}),

	on(logoutSuccess, (state, action) => {
		return {...state, message: {code: action.code, color: action.color}};
	}),

	/**
	 * Register
	 */
	on(startRegister, (state, action) => {
		return {...state, isLoading: true};
	}),

	on(acceptTerms, (state, action) => {
		return {...state, isLoading: false, message: {}};
	}),

	on(register, (state, action) => {
		return {...state, message: {}};
	}),

	on(registerSuccess, (state, action) => {
		return {...state, message: {}};
	}),

	on(sendVerificationMail, (state, action) => {
		return {...state};
	}),

	/**
	 * forgot Password
	 */
	on(forgotPassword, (state, action) => {
		return {...state, isLoading: true, message: {}};
	}),

	/**
	 * social Providers
	 */

	on(facebookLoginSuccess, (state, action) => {
		return {...state, isLoading: false, message: {}};
	}),

	on(googleLoginSuccess, (state, action) => {
		return {...state, isLoading: false, message: {}};
	}),

	on(twitterLoginSuccess, (state, action) => {
		return {...state, isLoading: false, message: {}};
	}),

);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
	return reducer(state, action);
}

import {
	acceptTerms,
	authMessage,
	credentialsLogin,
	forgotPassword,
	getAuthUser,
	logout,
	register, registerSuccess,
	sendVerificationMail, startLogin,
	startRegister
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

export const authReducer = createReducer(
	initialState,

	on(authMessage, (state, action) => {
		console.log(action);
		return {...state, isLoading: false, message: {code: action.code, color: action.color}};
	}),

	on(startLogin, (state, action) => {
		console.log(action.type);
		return {...state, isLoading: true, message: {}};
	}),

	on(credentialsLogin, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getAuthUser, (state, action) => {
		console.log(action);
		return {...state};
	}),

	on(logout, (state, action) => {
		console.log(action);
		return {...initialState};
	}),

	on(startRegister, (state, action) => {
		return {...state, isLoading: true};
	}),

	on(acceptTerms, (state, action) => {
		console.log(action);
		return {...state, isLoading: false, message: {}};
	}),

	on(register, (state, action) => {
		return {...state, message: {}};
	}),

	on(registerSuccess, (state, action) => {
		return {...state, message: {}};
	}),

	on(sendVerificationMail, (state, action) => {
		console.log(action);
		return {...state};
	}),

	on(forgotPassword, (state, action) => {
		console.log(action);
		return {...state, isLoading: true, message: {}};
	})

);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
	return authReducer(state, action);
}

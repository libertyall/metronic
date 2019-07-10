import { authError, credentialsLogin, getAuthUser, logout, register, setLoggedOut } from '../_actions/auth.actions';
import { UserInterface } from '../_interfaces/user.interface';
import { Action, createReducer, on } from '@ngrx/store';

export interface AuthState {
	loggedIn: boolean;
	user: UserInterface;
	isLoading: boolean;
}

export const initialState: AuthState = {
	loggedIn: false,
	user: undefined,
	isLoading: false
};

export const authReducer = createReducer(
	initialState,

	on(authError, (state, action) => {
		console.log(state);
		console.log(action);
		return { ...state };
	}),

	on(credentialsLogin, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getAuthUser, (state, action) => {
		console.log(action);
		return { ...state };
	}),

	on(setLoggedOut, () => {
		return { ...initialState };
	}),

	on(logout, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(register, (state, action) => {
		console.log(action.type);
		return { ...state };
	})
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
	return authReducer(state, action);
}

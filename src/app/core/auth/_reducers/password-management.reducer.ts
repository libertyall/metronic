import { PasswordManagementActionsUnion, PasswordManagementActionTypes } from '../_actions/password-management.actions';

export interface State {
	loading: boolean;
	success: boolean;
	error: {
		code: string;
		message: string
	};
}

const initialState = {
	loading: false,
	success: false,
	error: null
} as State;

export function reducer(state = initialState, action: PasswordManagementActionsUnion): State {
	switch (action.type) {

		case PasswordManagementActionTypes.ResetPasswordRequest:
		case PasswordManagementActionTypes.ChangePasswordRequest: {
			return {...state, loading: true, success: false, error: null};
		}

		case PasswordManagementActionTypes.ResetPasswordRequestError:
		case PasswordManagementActionTypes.ChangePasswordError: {
			return {...state, loading: false, success: false, error: action.payload};
		}

		case PasswordManagementActionTypes.ResetPasswordRequestSuccess:
		case PasswordManagementActionTypes.ChangePasswordSuccess: {
			return {...state, loading: false, success: true, error: null};
		}

		case PasswordManagementActionTypes.ResetPasswordStatus: {
			return {...state, loading: false, success: false, error: null};
		}

		default:
			return state;
	}
}

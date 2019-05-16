import { IUser } from '../_interfaces/user.interface';
import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';

export interface AuthState {
    loggedIn: boolean;
    user: IUser;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    user: null,
    isUserLoaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            return {
                loggedIn: true,
                user: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Register: {
            return {
                loggedIn: true,
                user: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

		case AuthActionTypes.UserLoaded: {
			// const _user: IUser = action.payload.user;
			return {
				...state,
				// user: _user,
				isUserLoaded: true
			};
		}

        default:
            return state;
    }
}

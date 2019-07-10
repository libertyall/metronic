import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../_interfaces/user.interface';

export const authError =  createAction('[AUTH]: Auth Error', props<{ error: any }>());

// export const getAuthUser = createAction('[AUTH]: Get authenticated User');
export const getAuthUser = createAction('[AUTH]: Get authenticated User' , props<{  user: UserInterface }>());
export const setLoggedOut = createAction('[AUTH]: set logged out');

export const credentialsLogin = createAction('[AUTH]: Login with Credentials', props<{ email: string, password: string, rememberMe?: boolean }>());
export const credentialsLoginSuccess =  createAction('[AUTH]: Login successful');

export const logout = createAction('[AUTH]: Logout');
export const logoutSuccess =  createAction('[AUTH]: Logout successful');

export const register = createAction('[AUTH]: Register new user', props<{  user: UserInterface }>());
export const registerSuccess = createAction('[AUTH]: Register successful');

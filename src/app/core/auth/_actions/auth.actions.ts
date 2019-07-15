import {createAction, props} from '@ngrx/store';
import {UserInterface} from '../_interfaces/user.interface';

export const authMessage = createAction('[AUTH]: Auth Message', props<{ code: string, color: string }>());

export const getAuthUser = createAction('[AUTH]: Get authenticated User');
export const setAuthUser = createAction('[AUTH]: Set authenticated User', props<{ user: UserInterface, isLoggedIn: boolean }>());
export const accountNotVerified = createAction('[AUTH]: Account not verified');

export const startLogin = createAction('[AUTH]: Start Login Process');
export const credentialsLogin = createAction('[AUTH]: Login with Credentials', props<{ credentials: { email: string, password: string, rememberMe?: boolean } }>());
export const credentialsLoginSuccess = createAction('[AUTH]: Login successful', props<{ user: UserInterface, isLoggedIn: boolean }>());

export const facebookLogin = createAction('[AUTH]: Facebook Login');
export const googleLogin = createAction('[AUTH]: Google Login');
export const twitterLogin = createAction('[AUTH]: Twitter Login');

export const facebookLoginSuccess = createAction('[AUTH]: Facebook Login successful', props<{ user: any }>());
export const googleLoginSuccess = createAction('[AUTH]: Google Login successful', props<{ user: any }>());
export const twitterLoginSuccess = createAction('[AUTH]: Twitter Login successful', props<{ user: any }>());

export const logout = createAction('[AUTH]: Logout');
export const logoutSuccess = createAction('[AUTH]: Logout successful', props<{ code: string, color: string }>());

export const startRegister = createAction('[AUTH]: Start Registration Process');
export const acceptTerms = createAction('[AUTH]: Accept Terms & Conditions');
export const register = createAction('[AUTH]: Register new user', props<{ user: UserInterface }>());
export const sendVerificationMail = createAction('[AUTH]: Send verification mail');
export const registerSuccess = createAction('[AUTH]: Register successful');

export const forgotPassword = createAction('[AUTH]: forgot Password', props<{ email: string }>());

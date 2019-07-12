import {createAction, props} from '@ngrx/store';
import {QueryParamsModel} from '../../_base/crud';
import {UserInterface} from '../_interfaces/user.interface';
import {User} from 'firebase';

export const usersPageToggleLoading = createAction('[USER]: toggle Page loading', props<{ isLoading: boolean }>());
export const usersActionToggleLoading = createAction('[USER]: toggle action loading', props<{ isLoading: boolean }>());

export const userError = createAction('[USER]: User error', props<{ error: any }>());
export const userSuccess = createAction('[USER]: Operation successfully');

export const userCreate = createAction('[USER]: User create', props<{ userData: any }>());
export const userCreateSuccess = createAction('[USER]: User created successfully', props<{ user: UserInterface }>());

export const userDelete = createAction('[USER]: User delete', props<{ user: UserInterface }>());
export const userUpdate = createAction('[USER]: User update', props<{ user: UserInterface }>());

export const getUser = createAction('[USER]: get user', props<{ user: User }>());
export const getUserSuccess = createAction('[USER]: user loaded successfully', props<{ user: UserInterface }>());

export const getAllUsers = createAction('[USER]: load all users');
export const getAllUsersSuccess = createAction('[USER]: loaded all users successfully', props<{ users: UserInterface[] }>());

export const getUsersPage = createAction('[USER]: load paged user-list', props<{ page: QueryParamsModel }>());
export const getUsersPageSuccess = createAction('[USER]: paged user-list loaded successfully', props<{ users: UserInterface[], totalCount: number, page: QueryParamsModel }>());
export const getUsersPageError = createAction('[USER]: paged user-list NOT loaded', props<{ error: any }>());

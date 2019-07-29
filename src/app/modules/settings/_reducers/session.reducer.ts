import { Action, createReducer, on } from '@ngrx/store';
import {toggleDataSource} from "../_actions/session.actions";
import { AuthState } from '../../../core/auth/_reducers/auth.reducers';

export interface SessionState {
	dataSource: string;
}

export const initialSessionState: SessionState = {
	dataSource: 'local'
};

export const reducer = createReducer(
	initialSessionState,

	on(toggleDataSource, (state, action) => {
		return {
			...state,
			dataSource: action.dataSource
		};
	})

);

export function sessionReducer(state: SessionState | undefined, action: Action): SessionState {
	return reducer(state, action);
}

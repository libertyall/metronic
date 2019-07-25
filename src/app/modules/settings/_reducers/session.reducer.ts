import {createReducer, on} from "@ngrx/store";
import {toggleDataSource} from "../_actions/session.actions";

export interface SessionState {
	dataSource: string;
}

export const initialSessionState: SessionState = {
	dataSource: 'local'
};

export const sessionReducer = createReducer(
	initialSessionState,

	on(toggleDataSource, (state, action) => {
		return {
			...state,
			dataSource: action.dataSource
		};
	})

);

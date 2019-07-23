import {Action, createReducer, on} from '@ngrx/store';
import {
	loadCurrentApplication,
	loadApplicationSuccess,
	saveApplication,
	settingsMessage
} from '../_actions/settings.actions';
import {Application} from "../_model/application.model";

export interface SettingsState {
	isLoading: boolean;
	showInitWaitingMessage: boolean;
	currentApplication: Application;
}

export const initialState: SettingsState = {
	isLoading: false,
	showInitWaitingMessage: true,
	currentApplication: undefined
};

export const reducer = createReducer(
	initialState,

	on(settingsMessage, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(loadCurrentApplication, (state, action) => {
		return {...state, isLoading: true};
	}),

	on(saveApplication, (state, action) => {
		return {...state, currentApplication: action.application };
	}),

	on(loadApplicationSuccess, (state, action) => {
		return {...state, isLoading: false, currentApplication: action.application};
	}),
);

export function settingsReducer(state: SettingsState | undefined, action: Action): SettingsState {
	return reducer(state, action);
}

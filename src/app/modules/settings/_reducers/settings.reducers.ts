import {Action, createReducer, on} from '@ngrx/store';
import {
	applicationLoaded,
	backendMessage,
	loadCurrentApplication, unsetBackendMessage,
	updateApplication,
	updateApplicationSuccess
} from '../_actions/settings.actions';
import {Application} from "../_model/application.model";

export interface SettingsState {
	isLoading: boolean;
	showInitWaitingMessage: boolean;
	currentApplication: Application;
	message?: {
		code: string;
		color: string;
	};
}

export const initialState: SettingsState = {
	isLoading: false,
	showInitWaitingMessage: true,
	currentApplication: undefined
};

export const reducer = createReducer(
	initialState,

	on(backendMessage, (state, action) => {
		return {...state, message: {code: action.code, color: action.color}};
	}),

	on(unsetBackendMessage, (state) => {
		console.log('unset');
		return {...state, message: undefined};
	}),

	on(loadCurrentApplication, (state, action) => {
		return {...state, isLoading: true};
	}),

	on(updateApplication, (state, action) => {
		return {...state, currentApplication: action.application, isLoading: true};
	}),

	on(updateApplicationSuccess, (state) => {
		return {...state, isLoading: false};
	}),

	on(applicationLoaded, (state, action) => {
		return {...state, isLoading: false, currentApplication: action.application};
	})
);

export function settingsReducer(state: SettingsState | undefined, action: Action): SettingsState {
	return reducer(state, action);
}

import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettingsState} from "../_reducers/settings.reducers";

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectSettingsPageLoading = createSelector(
	selectSettingsState,
	settingsState => settingsState.isLoading
);

export const selectSettingsShowInitWaitingMessage = createSelector(
	selectSettingsState,
	settingsState => settingsState.showInitWaitingMessage
);

export const getCurrentApplication = createSelector(
	selectSettingsState,
	settingsState =>  settingsState.currentApplication
);

export const backendMessage = createSelector(
	selectSettingsState,
	settingsState => settingsState.message
);

import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettingsState} from "../_reducers/settings.reducers";
import set = Reflect.set;
import {ɵSetterFn} from "@angular/core";

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');


export const selectSettingsPageLoading = createSelector(
	selectSettingsState,
	settingsState => settingsState.isLoading
);

export const selectSettingsShowInitWaitingMessage = createSelector(
	selectSettingsState,
	settingsState => settingsState.showInitWaitingMessage
);

export const selectSettingsInStore = createSelector(
	selectSettingsState,
	settingsState => settingsState.currentApplication
);

export const getCurrentApplication = createSelector(
	selectSettingsState,
	settingsState => {
		return settingsState.currentApplication;
	}
);

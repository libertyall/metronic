import {createAction, props} from '@ngrx/store';
import {Application} from "../_model/application.model";

export const settingsMessage = createAction('[SETTINGS]: Settings Message', props<{ code: string, color: string }>());

export const loadCurrentApplication = createAction('[SETTINGS]: Load current Application');
export const saveApplication = createAction('[SETTINGS]: Save application', props<{ application: Application }>());
export const saveApplicationSuccess = createAction('[SETTINGS]: App updated successfully', props<{ application: Application }>());

export const loadApplicationSuccess = createAction('[SETTINGS]: Current application loaded', props<{ application: Application }>());

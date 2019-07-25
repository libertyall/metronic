import {createAction, props} from '@ngrx/store';
import {Application} from "../_model/application.model";

export const backendMessage = createAction('[SETTINGS]: Settings Message', props<{ code: string, color: string }>());
export const unsetBackendMessage = createAction('[SETTINGS] unset Settings Message');

export const loadCurrentApplication = createAction('[SETTINGS]: Load current Application');
export const updateApplication = createAction('[SETTINGS]: Update application', props<{ application: Application }>());
export const updateApplicationSuccess = createAction('[SETTINGS]: App updated successfully', props<{ application: Application }>());

export const applicationLoaded = createAction('[SETTINGS]: Current application loaded', props<{ application: Application }>());

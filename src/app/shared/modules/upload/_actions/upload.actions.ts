import {createAction, props} from '@ngrx/store';

export const uploadMessage = createAction('[File Upload API]: Upload Message', props<{ code: string, color: string }>());

export const requestUpload = createAction('[File Upload API]: Request Upload', props<{ file: File }>());
export const progressUpload = createAction('[File Upload API]: Progress', props<{ progress: number }>());

export const cancelUpload = createAction('[File Upload API]: Cancel');
export const failedUpload = createAction('[File Upload API]: Failed', props<{ message: { code: string, color: string } }>());
export const resetUpload = createAction('[File Upload API]: Reset');
export const startedUpload = createAction('[File Upload API]: Started');
export const completedUpload = createAction('[File Upload API]: Completed');

export const allCancelUpload = createAction('[File Upload API]: All Canceled');
export const allStartedUpload = createAction('[File Upload API]: All Started');
export const allCompletedUpload = createAction('[File Upload API]: All Completed');
export const allProgressUpload = createAction('[File Upload API]: All Progress', props<{ progress: number }>());


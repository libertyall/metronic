import {
	cancelUpload, completedUpload, failedUpload, progressUpload, requestUpload, resetUpload, startedUpload,
	uploadMessage
} from '../_actions/upload.actions';
import { Action, createReducer, on } from '@ngrx/store';

export enum UploadStatus {
	Ready     = 'Ready',
	Requested = 'Requested',
	Started   = 'Started',
	Failed    = 'Failed',
	Completed = 'Completed'
}

export interface UploadState {
	status: UploadStatus;
	message: {
		code?: string;
		color?: string;
	};
	progress: number | null;
}

export const initialState: UploadState = {
	status: UploadStatus.Ready,
	message: {},
	progress: null
};

export const reducer = createReducer(
	initialState,

	on(uploadMessage, (state, action) => {
		return { ...state, isLoading: false, message: { code: action.code, color: action.color } };
	}),

	on(requestUpload, (state) => {
		return { ...state, status: UploadStatus.Requested, progress: null, message: {} };
	}),

	on(cancelUpload, (state) => {
		return { ...state, status: UploadStatus.Ready, progress: null, message: {} };
	}),

	on(resetUpload, (state) => {
		return { ...state, status: UploadStatus.Ready, progress: null, message: {} };
	}),

	on(startedUpload, (state) => {
		return { ...state, status: UploadStatus.Started, progress: 0 };
	}),

	on(failedUpload, (state, action) => {
		return { ...state, status: UploadStatus.Failed, progress: null, message: action.message };
	}),

	on(progressUpload, (state, action) => {
		return { ...state, progress: action.progress };
	}),

	on(completedUpload, (state) => {
		return { ...state, status: UploadStatus.Completed, progress: 100, message: {} };
	})
);

export function uploadReducer(state: UploadState | undefined, action: Action): UploadState {
	return reducer(state, action);
}

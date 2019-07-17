import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { UploadState, UploadStatus } from '../_reducers/upload.reducer';

const getError = (state: UploadState): {} => state.message;

const getStarted = (state: UploadState): boolean =>
	state.status === UploadStatus.Started;

const getRequested = (state: UploadState): boolean =>
	state.status === UploadStatus.Requested;

const getReady = (state: UploadState): boolean => state.status === UploadStatus.Ready;

const getProgress = (state: UploadState): number => state.progress;

const getInProgress = (state: UploadState): boolean =>
	state.status === UploadStatus.Started && state.progress >= 0;

const getFailed = (state: UploadState): boolean =>
	state.status === UploadStatus.Failed;

const getCompleted = (state: UploadState): boolean =>
	state.status === UploadStatus.Completed;

export const selectUploadFileFeatureState: MemoizedSelector<
	object,
	UploadState
	> = createFeatureSelector<UploadState>('uploadFile');

export const selectUploadFileError: MemoizedSelector<
	object,
	{}
	> = createSelector(
	selectUploadFileFeatureState,
	getError
);

export const selectUploadFileReady: MemoizedSelector<
	object,
	boolean
	> = createSelector(
	selectUploadFileFeatureState,
	getReady
);

export const selectUploadFileRequested: MemoizedSelector<
	object,
	boolean
	> = createSelector(
	selectUploadFileFeatureState,
	getRequested
);

export const selectUploadFileStarted: MemoizedSelector<
	object,
	boolean
	> = createSelector(
	selectUploadFileFeatureState,
	getStarted
);

export const selectUploadFileProgress: MemoizedSelector<
	object,
	number
	> = createSelector(
	selectUploadFileFeatureState,
	getProgress
);

export const selectUploadFileInProgress: MemoizedSelector<
	object,
	boolean
	> = createSelector(
	selectUploadFileFeatureState,
	getInProgress
);

export const selectUploadFileFailed: MemoizedSelector<
	object,
	boolean
	> = createSelector(
	selectUploadFileFeatureState,
	getFailed
);

export const selectUploadFileCompleted: MemoizedSelector<
	object,
	boolean
	> = createSelector(
	selectUploadFileFeatureState,
	getCompleted
);

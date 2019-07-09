import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ApplicationsState} from '../reducers/application.reducers';
import * as fromApplications from '../reducers/application.reducers';

export const selectApplicationsState = createFeatureSelector<ApplicationsState>('applications');

export const selectCurrentApplication = () => createSelector(
	selectApplicationsState,
	fromApplications.selectAll
);

export const selectApplicationPageLoading = createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.listLoading
);


export const selectApplicationActionLoading = createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.actionsLoading
);

export const selectApplicationShowInitWaitingMessage = createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.showInitWaitingMessage
);

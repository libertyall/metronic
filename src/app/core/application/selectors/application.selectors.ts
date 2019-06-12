import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationsState } from '../reducers/application.reducers';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';
import { each } from 'lodash';

export const selectApplicationsState = createFeatureSelector<ApplicationsState>('application');

export const selectApplicationById = (applicationId: string) => createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.entities[applicationId]
);

export const selectApplicationsPageLoading = createSelector(
	selectApplicationsState,
	applicationsState => {
		return applicationsState.listLoading;
	}
);

export const selectApplicationsActionLoading = createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.actionsLoading
);

export const selectLastCreatedApplicationId = createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.lastCreatedApplicationId
);

/* export const selectCategoriesPageLastQuery = createSelector(
 selectApplicationsState,
 categoriesState => categoriesState.lastQuery
 );
 */
export const selectApplicationsInStore = createSelector(
	selectApplicationsState,
	applicationsState => {
		const items: IApplication[] = [];
		each(applicationsState.entities, element => {
			items.push(element);
		});
		const httpExtension = new HttpExtenstionsModel();
		const result: IApplication[] = httpExtension.sortArray(items, applicationsState.lastQuery.sortField, applicationsState.lastQuery.sortOrder);
		return new QueryResultsModel(result, applicationsState.totalCount, '');
	}
);

/* export const selectAllCategories = createSelector(
 selectCategoriesState,
 fromCategory.selectAll
 );
 */
export const selectApplicationsShowInitWaitingMessage = createSelector(
	selectApplicationsState,
	applicationsState => applicationsState.showInitWaitingMessage
);

/* export const selectHasCategoriesInStore = createSelector(
 selectCategoriesState,
 queryResult => {
 return queryResult.totalCount;
 }
 ); */

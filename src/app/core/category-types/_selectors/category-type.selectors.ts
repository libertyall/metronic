import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategoryType from '../_reducers/category-type.reducers';
import { each } from 'lodash';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { CategoryTypeState } from '../_reducers/category-type.reducers';

export const selectCategoryTypesState = createFeatureSelector<CategoryTypeState>('category-types');

export const selectCategoryTypeById = (categoryTypeId: string) => createSelector(
	selectCategoryTypesState,
	categoryTypesState => categoryTypesState.entities[categoryTypeId]
);

export const selectCategoryTypesPageLoading = createSelector(
	selectCategoryTypesState,
	categoryTypesState => {
		return categoryTypesState.listLoading;
	}
);

export const selectCategoryTypesActionLoading = createSelector(
	selectCategoryTypesState,
	categoryTypesState => categoryTypesState.actionsLoading
);

export const selectLastCreatedCategoryTypeId = createSelector(
	selectCategoryTypesState,
	categoryTypesState => categoryTypesState.lastCreatedCategoryTypeId
);

export const selectCategoryTypesPageLastQuery = createSelector(
	selectCategoryTypesState,
	categoryTypesState => categoryTypesState.lastQuery
);

export const selectCategoryTypesInStore = createSelector(
	selectCategoryTypesState,
	categoryTypesState => {
		const items: ICategoryType[] = [];
		each(categoryTypesState.entities, element => {
			items.push(element);
		});
		const httpExtension = new HttpExtenstionsModel();
		const result: ICategoryType[] = httpExtension.sortArray(items, categoryTypesState.lastQuery.sortField, categoryTypesState.lastQuery.sortOrder);
		return new QueryResultsModel(result, categoryTypesState.totalCount, '');
	}
);

export const selectAllCategoryTypes = createSelector(
	selectCategoryTypesState,
	fromCategoryType.selectAll
);

export const selectCategoryTypesShowInitWaitingMessage = createSelector(
	selectCategoryTypesState,
	categoryTypesState => categoryTypesState.showInitWaitingMessage
);

export const selectHasCategoryTypesInStore = createSelector(
	selectCategoryTypesState,
	queryResult => {
		return queryResult.totalCount;
	}
);

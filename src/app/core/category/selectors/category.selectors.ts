import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducers';
import { CategoriesState } from '../reducers/category.reducers';
import { each } from 'lodash';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectCategoryById = (categoryId: string) => createSelector(
	selectCategoriesState,
	categoriesState => categoriesState.entities[categoryId]
);

export const selectCategoriesPageLoading = createSelector(
	selectCategoriesState,
	categoriesState => {
		return categoriesState.listLoading;
	}
);

export const selectCategoriesActionLoading = createSelector(
	selectCategoriesState,
	categoriesState => categoriesState.actionsLoading
);

export const selectLastCreatedCategoryId = createSelector(
	selectCategoriesState,
	categoriesState => categoriesState.lastCreatedCategoryId
);

export const selectCategoriesPageLastQuery = createSelector(
	selectCategoriesState,
	categoriesState => categoriesState.lastQuery
);

export const selectCategoriesInStore = createSelector(
	selectCategoriesState,
	categoriesState => {
		const items: ICategory[] = [];
		each(categoriesState.entities, element => {
			items.push(element);
		});
		const httpExtension = new HttpExtenstionsModel();
		const result: ICategory[] = httpExtension.sortArray(items, categoriesState.lastQuery.sortField, categoriesState.lastQuery.sortOrder);
		return new QueryResultsModel(result, categoriesState.totalCount, '');
	}
);

export const selectAllCategories = createSelector(
	selectCategoriesState,
	fromCategory.selectAll
);

export const selectCategoriesShowInitWaitingMessage = createSelector(
	selectCategoriesState,
	categoriesState => categoriesState.showInitWaitingMessage
);

export const selectHasCategoriesInStore = createSelector(
	selectCategoriesState,
	queryResult => {
		return queryResult.totalCount;
	}
);

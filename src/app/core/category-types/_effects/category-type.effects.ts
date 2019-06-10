import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	CategoryTypeActionTypes, CategoryTypeCreated, CategoryTypeDeleted, CategoryTypeLoaded, CategoryTypeOnServerCreated,
	CategoryTypeRequested, CategoryTypesActionToggleLoading, CategoryTypesPageLoaded, CategoryTypesPageRequested,
	CategoryTypesPageToggleLoading, CategoryTypeUpdated
} from '../_actions/category-types.actions';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { forkJoin, of } from 'rxjs';
import { AppState } from '../../reducers';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';

@Injectable()
export class CategoryTypeEffects {
	showPageLoadingDispatcher = new CategoryTypesPageToggleLoading({ isLoading: true });
	hidePageLoadingDispatcher = new CategoryTypesPageToggleLoading({ isLoading: false });

	showActionLoadingDispatcher = new CategoryTypesActionToggleLoading({ isLoading: true });
	hideActionLoadingDispatcher = new CategoryTypesActionToggleLoading({ isLoading: false });

	constructor(private actions$: Actions, private categoryTypeService: CategoryTypeService, private store: Store<AppState>) {
	}

	@Effect()
	loadCategoryTypesPage$ = this.actions$
		.pipe(
			ofType<CategoryTypesPageRequested>(CategoryTypeActionTypes.CategoryTypesPageRequested),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showPageLoadingDispatcher);
				const requestToServer = this.categoryTypeService.getCategoryTypes(payload.page);
				const lastQuery = of(payload.page);
				return forkJoin(requestToServer, lastQuery);
			}),
			map((response: any) => {
				const result: QueryResultsModel = response[0];
				const lastQuery: QueryParamsModel = response[1];
				return new CategoryTypesPageLoaded({
					categoryTypes: result.items,
					totalCount: result.totalCount,
					page: lastQuery
				});
			})
		);

	@Effect()
	deleteCategoryType$ = this.actions$
		.pipe(
			ofType<CategoryTypeDeleted>(CategoryTypeActionTypes.CategoryTypeDeleted),
			mergeMap(({ payload }) => {
					this.store.dispatch(this.showActionLoadingDispatcher);
					return this.categoryTypeService.removeCategoryType(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	updateCategoryType$ = this.actions$
		.pipe(
			ofType<CategoryTypeUpdated>(CategoryTypeActionTypes.CategoryTypeUpdated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.categoryTypeService.updateCategoryType(payload.categoryType);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	createCategoryType$ = this.actions$
		.pipe(
			ofType<CategoryTypeOnServerCreated>(CategoryTypeActionTypes.CategoryTypeOnServerCreated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.categoryTypeService.createCategoryType(payload.categoryType).then(
					(res) => this.store.dispatch(new CategoryTypeCreated({ categoryType: res })
					)
				);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	loadCategoryType$ = this.actions$
		.pipe(
			ofType<CategoryTypeRequested>(CategoryTypeActionTypes.CategoryTypeRequested),
			mergeMap(action => this.categoryTypeService.getCategoryTypeById(action.payload.categoryTypeId)),
			map(categoryType => new CategoryTypeLoaded({ categoryType }))
		);
}

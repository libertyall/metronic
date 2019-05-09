import { Injectable } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	CategoriesActionToggleLoading, CategoriesPageLoaded, CategoriesPageRequested, CategoriesPageToggleLoading,
	CategoryActionTypes, CategoryCreated, CategoryDeleted, CategoryOnServerCreated, CategoryUpdated
} from '../_actions/category.actions';
import { QueryParamsModel, QueryResultsModel } from '../../../../core/_base/crud';
import { forkJoin, of } from 'rxjs';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { AppState } from '../../../../core/reducers';

@Injectable()
export class CategoryEffects {
	showPageLoadingDistpatcher = new CategoriesPageToggleLoading({ isLoading: true });
	hidePageLoadingDistpatcher = new CategoriesPageToggleLoading({ isLoading: false });

	showActionLoadingDistpatcher = new CategoriesActionToggleLoading({ isLoading: true });
	hideActionLoadingDistpatcher = new CategoriesActionToggleLoading({ isLoading: false });

	constructor(private actions$: Actions, private categoryService: CategoryService, private store: Store<AppState>) {
	}

	@Effect()
	loadCategoriesPage$ = this.actions$
		.pipe(
			ofType<CategoriesPageRequested>(CategoryActionTypes.CategoriesPageRequested),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showPageLoadingDistpatcher);
				const requestToServer = this.categoryService.getCategories(payload.page);
				console.log(payload);
				const lastQuery = of(payload.page);
				return requestToServer;
				// return forkJoin(requestToServer, lastQuery);
			}),
			map((response: any) => {
				console.log('testing');
				console.log(response);
				const result: QueryResultsModel = response[0];
				const lastQuery: QueryParamsModel = response[1];
				return new CategoriesPageLoaded({
					categories: result.items,
					totalCount: result.totalCount,
					page: lastQuery
				});
			})
		);

	@Effect()
	deleteCategory$ = this.actions$
		.pipe(
			ofType<CategoryDeleted>(CategoryActionTypes.CategoryDeleted),
			mergeMap(({ payload }) => {
					this.store.dispatch(this.showActionLoadingDistpatcher);
					return this.categoryService.removeCategory(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			})
		);

	@Effect()
	updateCategory$ = this.actions$
		.pipe(
			ofType<CategoryUpdated>(CategoryActionTypes.CategoryUpdated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.categoryService.updateCategory(payload.category);
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			})
		);

	@Effect()
	createCategory$ = this.actions$
		.pipe(
			ofType<CategoryOnServerCreated>(CategoryActionTypes.CategoryOnServerCreated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.categoryService.createCategory(payload.category).then(
					(res) => this.store.dispatch(new CategoryCreated({ category: res })
					)
				);
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			})
		);
}

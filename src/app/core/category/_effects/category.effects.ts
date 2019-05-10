import {Injectable} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {
	CategoriesActionToggleLoading,
	CategoriesPageLoaded,
	CategoriesPageRequested,
	CategoriesPageToggleLoading,
	CategoryActionTypes,
	CategoryCreated,
	CategoryDeleted,
	CategoryLoaded,
	CategoryOnServerCreated,
	CategoryRequested,
	CategoryUpdated
} from '../_actions/category.actions';
import {QueryParamsModel, QueryResultsModel} from '../../_base/crud';
import {forkJoin, of} from 'rxjs';
import {CategoryService} from '../../../shared/services/category/category.service';
import {AppState} from '../../reducers';

@Injectable()
export class CategoryEffects {
	showPageLoadingDispatcher = new CategoriesPageToggleLoading({isLoading: true});
	hidePageLoadingDispatcher = new CategoriesPageToggleLoading({isLoading: false});

	showActionLoadingDispatcher = new CategoriesActionToggleLoading({isLoading: true});
	hideActionLoadingDispatcher = new CategoriesActionToggleLoading({isLoading: false});

	constructor(private actions$: Actions, private categoryService: CategoryService, private store: Store<AppState>) {
	}

	@Effect()
	loadCategoriesPage$ = this.actions$
		.pipe(
			ofType<CategoriesPageRequested>(CategoryActionTypes.CategoriesPageRequested),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showPageLoadingDispatcher);
				const requestToServer = this.categoryService.getCategories(payload.page);
				const lastQuery = of(payload.page);
				return forkJoin(requestToServer, lastQuery);
			}),
			map((response: any) => {
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
			mergeMap(({payload}) => {
					this.store.dispatch(this.showActionLoadingDispatcher);
					return this.categoryService.removeCategory(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	updateCategory$ = this.actions$
		.pipe(
			ofType<CategoryUpdated>(CategoryActionTypes.CategoryUpdated),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.categoryService.updateCategory(payload.category);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	createCategory$ = this.actions$
		.pipe(
			ofType<CategoryOnServerCreated>(CategoryActionTypes.CategoryOnServerCreated),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.categoryService.createCategory(payload.category).then(
					(res) => this.store.dispatch(new CategoryCreated({category: res})
					)
				);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	loadCategory$ = this.actions$
		.pipe(
			ofType<CategoryRequested>(CategoryActionTypes.CategoryRequested),
			mergeMap(action => this.categoryService.getCategoryById(action.payload.categoryId)),
			map(category => new CategoryLoaded({category}))
		);
}

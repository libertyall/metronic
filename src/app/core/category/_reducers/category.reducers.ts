import {createFeatureSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CategoryActions, CategoryActionTypes} from '../_actions/category.actions';
import {ICategory} from '../../../shared/interfaces/category.interface';
import {QueryParamsModel} from '../../_base/crud';

// tslint:disable-next-line:no-empty-interface
export interface CategoriesState extends EntityState<ICategory> {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
	lastCreatedCategoryId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>();

export const initialCategoriesState: CategoriesState = adapter.getInitialState({
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
	lastQuery: new QueryParamsModel({}),
	lastCreatedCategoryId: undefined,
	showInitWaitingMessage: true
});

export function categoriesReducer(state = initialCategoriesState, action: CategoryActions): CategoriesState {
	switch (action.type) {

		case CategoryActionTypes.CategoriesPageToggleLoading:
			return {
				...state, listLoading: action.payload.isLoading, lastCreatedCategoryId: undefined
			};

		case CategoryActionTypes.CategoriesActionToggleLoading:
			return {
				...state, actionsLoading: action.payload.isLoading
			};

		case CategoryActionTypes.CategoryOnServerCreated:
			return {
				...state
			};

		case CategoryActionTypes.CategoryCreated:
			return adapter.addOne(action.payload.category, {
				...state, lastCreatedCategoryId: action.payload.category.id
			});

		case CategoryActionTypes.CategoryUpdated:
			return adapter.updateOne(action.payload.partialCategory, state);

		case CategoryActionTypes.CategoryDeleted:
			return adapter.removeOne(action.payload.id, state);

		case CategoryActionTypes.CategoriesPageCancelled:
			return {
				...state, listLoading: false, lastQuery: new QueryParamsModel({})
			};

		case CategoryActionTypes.CategoriesPageLoaded: {
			return adapter.addMany(action.payload.categories, {
				...initialCategoriesState,
				totalCount: action.payload.totalCount,
				lastQuery: action.payload.page,
				listLoading: false,
				showInitWaitingMessage: false
			});
		}
		default:
			return state;
	}
}

export const getCategoryState = createFeatureSelector<CategoriesState>('categories');

export const {
	selectAll,
	selectEntities,
	selectIds,
	selectTotal
} = adapter.getSelectors();

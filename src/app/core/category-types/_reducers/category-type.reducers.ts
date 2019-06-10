import {createFeatureSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {QueryParamsModel} from '../../_base/crud';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { CategoryTypeActionTypes, CategoryTypesActions } from '../_actions/category-types.actions';

// tslint:disable-next-line:no-empty-interface
export interface CategoryTypeState extends EntityState<ICategoryType> {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
	lastCreatedCategoryTypeId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<ICategoryType> = createEntityAdapter<ICategoryType>();

export const initialCategoryTypeState: CategoryTypeState = adapter.getInitialState({
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
	lastQuery: new QueryParamsModel({}),
	lastCreatedCategoryTypeId: undefined,
	showInitWaitingMessage: true
});

export function categoryTypeReducer(state = initialCategoryTypeState, action: CategoryTypesActions): CategoryTypeState {

	switch (action.type) {

		case CategoryTypeActionTypes.CategoryTypesPageToggleLoading:
			return {
				...state, listLoading: action.payload.isLoading, lastCreatedCategoryTypeId: undefined
			};

		case CategoryTypeActionTypes.CategoryTypesActionToggleLoading:
			return {
				...state, actionsLoading: action.payload.isLoading
			};

		case CategoryTypeActionTypes.CategoryTypeOnServerCreated:
			return {
				...state
			};

		case CategoryTypeActionTypes.CategoryTypeCreated:
			return adapter.addOne(action.payload.categoryType, {
				...state, lastCreatedCategoryId: action.payload.categoryType.id
			});

		case CategoryTypeActionTypes.CategoryTypeUpdated:
			return adapter.updateOne(action.payload.partialCategoryType, state);

		case CategoryTypeActionTypes.CategoryTypeDeleted:
			return adapter.removeOne(action.payload.id, state);

		case CategoryTypeActionTypes.CategoryTypesPageCancelled:
			return {
				...state, listLoading: false, lastQuery: new QueryParamsModel({})
			};

		case CategoryTypeActionTypes.CategoryTypesPageLoaded: {
			return adapter.addMany(action.payload.categoryTypes, {
				...initialCategoryTypeState,
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

export const getCategoryTypeState = createFeatureSelector<CategoryTypeState>('category-types');

export const {
	selectAll,
	selectEntities,
	selectIds,
	selectTotal
} = adapter.getSelectors();

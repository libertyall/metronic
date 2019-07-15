import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { CategoryModel } from './model/category.model';

export const { initialState, selectors, facade: CategoryFacadeBase } = buildState(CategoryModel);

export const {
				 selectAll: allCategories
			 } = selectors;

export function categoryReducer(state = initialState): IEntityState<CategoryModel> {
	return state;
}

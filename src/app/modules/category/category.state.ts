import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Category } from './model/category.model';

export const { initialState, selectors, facade: CategoryFacadeBase } = buildState(Category);

export const {
				 selectAll: allCategories
			 } = selectors;

export function categoryReducer(state = initialState): IEntityState<Category> {
	return state;
}

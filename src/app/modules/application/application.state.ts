import { Action } from '@ngrx/store';
import { buildState, IEntityState, IModelState } from '@briebug/ngrx-auto-entity';
import { ApplicationModel } from './model/application.model';

export const { initialState, selectors, facade: ApplicationFacadeBase } = buildState(ApplicationModel);

export const {
				 selectAll: allApplications
			 } = selectors;

export function applicationReducer(state = initialState): IEntityState<ApplicationModel> {
	return state;
}

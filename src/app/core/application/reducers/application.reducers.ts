import { createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ApplicationActions, ApplicationActionTypes } from '../actions/application.actions';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { QueryParamsModel } from '../../_base/crud';

// tslint:disable-next-line:no-empty-interface
export interface ApplicationsState extends EntityState<IApplication> {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
	lastCreatedApplicationId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<IApplication> = createEntityAdapter<IApplication>();

export const initialApplicationsState: ApplicationsState = adapter.getInitialState({
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
	lastQuery: new QueryParamsModel({}),
	lastCreatedApplicationId: undefined,
	showInitWaitingMessage: true
});

export function applicationReducer(state = initialApplicationsState, action: ApplicationActions): ApplicationsState {

	switch (action.type) {
		case ApplicationActionTypes.ApplicationOnServerCreated:
			return {
				...state
			};

		case ApplicationActionTypes.ApplicationCreated:
			return adapter.addOne(action.payload.application, {
				...state, lastCreatedApplicationId: action.payload.application.id
			});

		case ApplicationActionTypes.ApplicationUpdated:
			return adapter.updateOne(action.payload.partialApplication, state);

		case ApplicationActionTypes.ApplicationDeleted:
			return adapter.removeOne(action.payload.id, state);

		default:
			return state;
	}
}

export const getApplicationState = createFeatureSelector<ApplicationsState>('applications');

export const {
				 selectAll,
				 selectEntities,
				 selectIds,
				 selectTotal
			 } = adapter.getSelectors();

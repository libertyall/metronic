import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
import { UserState } from '../_reducers/user.reducers';
import { each } from 'lodash';
import { UserInterface } from '../_interfaces/user.interface';

export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectUserById = (userId: string) => createSelector(
    selectUsersState,
    usersState => usersState.entities[userId]
);

export const selectUsersPageLoading = createSelector(
    selectUsersState,
    usersState => {
        return usersState.listLoading;
    }
);

export const selectUsersActionLoading = createSelector(
    selectUsersState,
    usersState => usersState.actionsLoading
);

export const selectLastCreatedUserId = createSelector(
    selectUsersState,
    usersState => usersState.lastCreatedUserId
);

export const selectUsersPageLastQuery = createSelector(
    selectUsersState,
    usersState => {
    	console.log(usersState);
    	return usersState;
	}
);

export const selectUsersInStore = createSelector(
    selectUsersState,
    usersState => {
        const items: UserInterface[] = [];
        each(usersState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        console.log(usersState);
        const result: UserInterface[] = httpExtension.sortArray(items, usersState.lastQuery.sortField,
		 usersState.lastQuery.sortOrder);
        return new QueryResultsModel(result, usersState.totalCount, '');
    }
);

export const selectUsersShowInitWaitingMessage = createSelector(
    selectUsersState,
    usersState => usersState.showInitWaitingMessage
);

export const selectHasUsersInStore = createSelector(
    selectUsersState,
    queryResult =>  queryResult.totalCount
);

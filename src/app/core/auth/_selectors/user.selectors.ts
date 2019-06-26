import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
import { UsersState } from '../_reducers/user.reducers';
import { each } from 'lodash';
import { IUser } from '../_interfaces/user.interface';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUserById = (userId: string) => createSelector(
    selectUsersState,
    usersState => usersState.entities[userId]
);

export const selectUsersPageLoading = createSelector(
    selectUsersState,
    usersState => usersState.listLoading
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
    usersState => usersState.lastQuery
);

export const selectUsersInStore = createSelector(
    selectUsersState,
    usersState => {
        const items: IUser[] = [];
        each(usersState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: IUser[] = httpExtension.sortArray(items, usersState.lastQuery.sortField, usersState.lastQuery.sortOrder);
        return new QueryResultsModel(result, usersState.totalCount, '');
    }
);

export const selectUsersShowInitWaitingMessage = createSelector(
    selectUsersState,
    usersState => usersState.showInitWaitingMessage
);

export const selectHasUsersInStore = createSelector(
    selectUsersState,
    queryResult => {
        return queryResult.totalCount;
    }
);

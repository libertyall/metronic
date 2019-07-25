import {createAction, props} from '@ngrx/store';

export const toggleDataSource = createAction('[SESSION]: Toggle DataSource', props<{ dataSource: string }>());

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { EntityOp, ofEntityOp } from '@ngrx/data';

@Injectable()
export class CategoryEffects {

	constructor(private actions$: Actions) {
	}

	/* @Effect()
		// `mergeMap` allows for concurrent requests which may return in any order
		persist$: Observable<Action> = this.actions.pipe(
			ofEntityOp(persistOps),
			mergeMap(action => this.persist(action))
		); */

	getAll = createEffect(() => this.actions$.pipe(
		ofEntityOp(EntityOp.QUERY_ALL),
		tap(() => EntityOp.SET_LOADING),
		// catchError(error => EntityOp.QUERY_ALL_ERROR)
	));

}

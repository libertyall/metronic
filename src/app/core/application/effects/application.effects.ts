import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { ApplicationService } from '../../../shared/services/application/application.service';
import {
	ApplicationActionTypes, ApplicationCreated, ApplicationLoaded, ApplicationRequested,
	ApplicationsActionToggleLoading, ApplicationUpdated
} from '../actions/application.actions';

@Injectable()
export class ApplicationEffects {

	showActionLoadingDispatcher = new ApplicationsActionToggleLoading({ isLoading: true });
	hideActionLoadingDispatcher = new ApplicationsActionToggleLoading({ isLoading: false });

	constructor(private actions$: Actions,
				private applicationService: ApplicationService,
				private store: Store<AppState>) {
	}

	@Effect()
	updateApplication$ = this.actions$
		.pipe(
			ofType<ApplicationUpdated>(ApplicationActionTypes.ApplicationUpdated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.applicationService.updateApplication(payload.application);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	createApplication$ = this.actions$
		.pipe(
			ofType<ApplicationCreated>(ApplicationActionTypes.ApplicationOnServerCreated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.applicationService.createApplication(payload.application).then(
					(res) => this.store.dispatch(new ApplicationCreated({ application: res })
					)
				);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	loadApplication$ = this.actions$
		.pipe(
			ofType<ApplicationRequested>(ApplicationActionTypes.ApplicationRequested),
			mergeMap(action => this.applicationService.getCurrentApplication()),
			map(application => new ApplicationLoaded({ application }))
		);
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {ApplicationService} from "../_services/application.service";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {
	applicationLoaded,
	backendMessage,
	updateApplication,
	updateApplicationSuccess
} from "../_actions/settings.actions";
import {Application} from "../_model/application.model";

@Injectable()
export class SettingsEffects {

	constructor(private actions$: Actions,
				private applicationService: ApplicationService) {
	}

	updateApplication = createEffect(() => this.actions$.pipe(
		ofType(updateApplication),
		switchMap(action => this.applicationService.updateApplication(action.application)),
		map((application: Application) => updateApplicationSuccess({application})),
		catchError(error => of(backendMessage({code: error.code, color: 'danger'})))
	));

	init = createEffect(() => this.actions$.pipe(
		ofType(ROOT_EFFECTS_INIT),
		switchMap(() => this.applicationService.getCurrentApplication()),
		map((application: Application) => applicationLoaded({application})),
		catchError(error => of(backendMessage({code: error.code, color: 'danger'})))
	));

}

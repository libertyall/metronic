import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApplicationService} from "../_services/application.service";
import {catchError, exhaustMap, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {
	loadCurrentApplication,
	loadApplicationSuccess,
	settingsMessage,
	saveApplication, saveApplicationSuccess
} from "../_actions/settings.actions";
import {Application} from "../_model/application.model";
import {authMessage, logout, register, sendVerificationMail} from "../../../core/auth/_actions/auth.actions";
import {UserInterface} from "../../../core/auth/_interfaces/user.interface";

@Injectable()
export class SettingsEffects {

	constructor(private actions$: Actions,
				private applicationService: ApplicationService) {
	}

	loadCurrentApplication = createEffect(() => this.actions$.pipe(
		ofType(loadCurrentApplication),
		switchMap(() => {
			return this.applicationService.getCurrentApplication().pipe(
				map((application: Application) => {
					// ToDo: Serialize creation.at
					console.log(application.creation.at);
					delete(application.creation.at);
					return loadApplicationSuccess({ application });
				}),
				catchError(error => of(settingsMessage({code: error.code, color: 'danger'})))
			);
		})
	));

	saveApplication = createEffect(() => this.actions$.pipe(
		ofType(saveApplication),
		switchMap(action => this.applicationService.updateApplication(action.application)),
		map((application: Application) => saveApplicationSuccess({application})),
		catchError(error => of(authMessage({code: error.code, color: 'danger'})))
	));
}

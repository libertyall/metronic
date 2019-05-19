import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';

import * as EmailHandlerActions from '../_actions/email-handler.actions';
import {catchError, map, mapTo, switchMap} from 'rxjs/operators';

export type Action = EmailHandlerActions.EmailHandlerActions;

@Injectable()
export class EmailHandlerEffects {

	@Effect()
	verifyEmail: Observable<Action> = this.actions$.pipe(
		ofType<EmailHandlerActions.VerifyEmailAddress>(EmailHandlerActions.EmailHandlerActionTypes.VerifyEmailAddress),
		map(action => action.payload),
		switchMap(payload => {
			return from(this.afAuth.auth.applyActionCode(payload.actionCode).then(async res => {
			})).pipe(
				mapTo(new EmailHandlerActions.VerifyEmailAddressSuccess()),
				catchError(error => of(new EmailHandlerActions.VerifyEmailAddressError(error)))
			);
		})
	);

	@Effect()
	verifyPasswordResetCode: Observable<Action> = this.actions$.pipe(
		ofType<EmailHandlerActions.VerifyPasswordResetCode>(EmailHandlerActions.EmailHandlerActionTypes.VerifyPasswordResetCode),
		map(action => action.payload),
		switchMap(payload => {
			return from(this.afAuth.auth.verifyPasswordResetCode(payload.actionCode)).pipe(
				switchMap((email: string) => {
					return of(new EmailHandlerActions.VerifyPasswordResetCodeSuccess({email, actionCode: payload.actionCode}));
				}),
				catchError(error => of(new EmailHandlerActions.VerifyPasswordResetCodeError(error)))
			);
		})
	);

	@Effect()
	resetPassword: Observable<Action> = this.actions$.pipe(
		ofType<EmailHandlerActions.ResetPassword>(EmailHandlerActions.EmailHandlerActionTypes.ResetPassword),
		map(action => action.payload),
		switchMap(payload => {
			return from(this.afAuth.auth.confirmPasswordReset(payload.actionCode, payload.newPassword)).pipe(
				switchMap(() => {
					return of(new EmailHandlerActions.ResetPasswordSuccess());
				}),
				catchError(error => of(new EmailHandlerActions.ResetPasswordError(error)))
			);
		})
	);

	@Effect()
	checkActionCode: Observable<Action> = this.actions$.pipe(
		ofType<EmailHandlerActions.CheckActionCode>(EmailHandlerActions.EmailHandlerActionTypes.CheckActionCode),
		map(action => action.payload),
		switchMap(payload => {
			return from(this.afAuth.auth.checkActionCode(payload.actionCode)).pipe(
				map(info => info['data']['email']),
				switchMap((restoredEmail: string) => {
					return of(new EmailHandlerActions.CheckActionCodeSuccess({actionCode: payload.actionCode, restoredEmail}));
				}),
				catchError(error => of(new EmailHandlerActions.CheckActionCodeError(error)))
			);
		})
	);

	@Effect()
	revertOldEmail: Observable<Action> = this.actions$.pipe(
		ofType<EmailHandlerActions.RecoverEmail>(EmailHandlerActions.EmailHandlerActionTypes.RecoverEmail),
		map(action => action.payload),
		switchMap(payload => {
			return from(this.afAuth.auth.applyActionCode(payload.actionCode)).pipe(
				switchMap(() => {
					return of(new EmailHandlerActions.RecoverEmailSuccess());
				}),
				catchError(error => of(new EmailHandlerActions.RecoverEmailError(error)))
			);
		})
	);

	constructor(private actions$: Actions,
				private afAuth: AngularFireAuth) {

	}
}

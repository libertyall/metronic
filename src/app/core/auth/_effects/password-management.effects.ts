import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { catchError, exhaustMap, map, mapTo } from 'rxjs/operators';
import {
	ChangePasswordError, ChangePasswordSuccess, PasswordManagementActionTypes, ResetPasswordRequestError,
	ResetPasswordRequestSuccess
} from '../_actions/password-management.actions';

@Injectable()
export class PasswordManagementEffects {

	@Effect()
	changePassword: Observable<Action> = this.actions$.pipe(
		ofType(PasswordManagementActionTypes.ChangePasswordRequest),
		// @ts-ignore
		map(action => action.payload),
		exhaustMap(payload => {
			const credentials = firebase.auth.EmailAuthProvider.credential(this.afAuth.auth.currentUser.email, payload.oldPassword);
			return from(this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credentials).then(async res => {
				await this.afAuth.auth.currentUser.updatePassword(payload.newPassword);
				return;
			})).pipe(
				mapTo(new ChangePasswordSuccess()),
				catchError(error => of(new ChangePasswordError(error)))
			);
		})
	);

	@Effect()
	passwordForgotten$ = this.actions$.pipe(
		ofType(PasswordManagementActionTypes.ResetPasswordRequest),
		// @ts-ignore
		map(action => action.payload),
		exhaustMap(payload => {
			return from(this.afAuth.auth.sendPasswordResetEmail(payload.email, { url: payload.redirectUrl })).pipe(
				map(() => {
					return new ResetPasswordRequestSuccess();
				}),
				catchError(err => of(new ResetPasswordRequestError(err)))
			);
		})
	);

	constructor(private actions$: Actions,
				private afAuth: AngularFireAuth) {

	}
}

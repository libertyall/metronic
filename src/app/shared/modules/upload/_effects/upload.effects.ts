import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { UploadService } from '../services/upload.service';

@Injectable({ providedIn: 'root' })
export class UploadEffects {

	constructor(private actions$: Actions,
				private uploadService: UploadService) {
	}

	/* uploadRequest = createEffect(() => this.actions$.pipe(
	 ofType(Upload.Requested),
	 exhaustMap(action => {
	 console.log(action);
	 return this.userService.createUser(action.userData).pipe(
	 catchError(error => of(authMessage({code: error.code, color: 'danger'})))
	 );
	 })
	 )); */

}

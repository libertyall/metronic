import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../_services/auth.service';
import { AllPermissionsLoaded, AllPermissionsRequested, PermissionActionTypes } from '../_actions/permission.actions';
import { Permission } from '../_interfaces/permission.interface';

@Injectable()
export class PermissionEffects {

	constructor(private actions$: Actions, private auth: AuthService) { }

    @Effect()
    loadAllPermissions$ = this.actions$
        .pipe(
            ofType<AllPermissionsRequested>(PermissionActionTypes.AllPermissionsRequested),
            mergeMap(() => this.auth.getPermissions()),
            map((result: Permission[]) => {
                return  new AllPermissionsLoaded({
                    permissions: result
                });
            })
          );

    @Effect()
    init$: Observable<Action> = defer(() => {
        return of(new AllPermissionsRequested());
    });
}

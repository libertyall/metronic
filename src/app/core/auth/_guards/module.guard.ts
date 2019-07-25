import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { find } from 'lodash';
import { currentUserPermissions } from '../_selectors/auth.selectors';
import { PermissionClass } from '../_interfaces/permission.interface';

@Injectable()
export class ModuleGuard implements CanActivate {
	constructor(private store: Store<AppState>, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

		const moduleName = route.data[ 'moduleName' ] as string;
		if (!moduleName) {
			return of(false);
		}

		return this.store
			.pipe(
				select(currentUserPermissions),
				map((permissions: PermissionClass[]) => {
					const _perm = find(permissions, (elem: PermissionClass) => {
						return elem.title.toLocaleLowerCase() === moduleName.toLocaleLowerCase();
					});
					return !!_perm;
				}),
				tap(hasAccess => {
					if (!hasAccess) {
						this.router.navigateByUrl('/error/403').then(() => console.log('no access granted'));
					}
				})
			);
	}
}

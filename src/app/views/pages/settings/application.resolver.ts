import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/reducers';
import {IApplication} from '../../../shared/interfaces/application.interface';
import {ApplicationRequested} from '../../../core/application/actions/application.actions';

@Injectable()
export class ApplicationResolver implements Resolve<IApplication> {

	constructor(private router: Router,
				private store: Store<AppState>) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApplication> {
		this.store.dispatch(new ApplicationRequested());
		return this.waitForApplicationToLoad();
	}


	waitForApplicationToLoad(): Observable<IApplication> {
		console.log('load current app');
		return of();
	}

}

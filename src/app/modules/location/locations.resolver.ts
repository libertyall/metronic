import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location } from './_model/location.class';

@Injectable()
export class LocationsResolver implements Resolve<Location[]> {

	constructor(/* private locationService: LocationService,
				 private router: Router */) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location[]> {
		return of([]);
	}

}

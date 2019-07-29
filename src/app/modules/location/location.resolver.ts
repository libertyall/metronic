import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location } from './_model/location.class';

@Injectable()
export class LocationResolver implements Resolve<Location> {

	constructor(/* private locationService: LocationService,
				private router: Router */) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location> {
		return of({
			title: '12345'
		});
		/* if (route.params['locationId'] === 'new') {
		 return this.locationService.setNewLocation();
		 }
		 return this.locationService.getLocationById(route.params['locationId']).pipe(
		 take(1),
		 map((location: ILocation) => {
		 if (location && location.id) {
		 return location;
		 } else {
		 this.router.navigate(['/locations']).then();
		 }
		 }) */
	}

}

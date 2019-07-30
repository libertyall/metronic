import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Club} from "./_model/club.model";

@Injectable()
export class ClubResolver implements Resolve<Club> {

	constructor() {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Club> {
		return of({
			id: 'asd',
			title: '12345',
			creation: {
				at: new Date(),
				by: 'sd'
			},
			history: 'Geschichte',
			honoraries: [
			],
			management: [],
			timeLine: []
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

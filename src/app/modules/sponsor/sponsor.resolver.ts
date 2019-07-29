import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Sponsor} from "./_model/sponsor.class";

@Injectable()
export class SponsorResolver implements Resolve<Sponsor> {

	constructor(// private sponsorService: SponsorService,
		private router: Router) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sponsor> {
		if (!route.params['sponsorId']) {
			// return this.sponsorService.setNewSponsor();
		}

		return of({
			title: '12345',
			displayInFooter: false,
			description: 'aslkdöakdölakdasdaösdasd',
			assignedCategories: [],
			internalInfo: 'interne infos',
			contact: {
				name: 'Manfred Burgsmüller',
				email: 'test@test.de',
				phoneWork: '1234567',
				fax: '9999'
			},
			externalLink: 'www.google.de',
			startDate: new Date(),
			endDate: new Date(),
			revenue: 128
		});
		/* return this.sponsorService.getSponsorById(route.params['sponsorId']).pipe(
		  take(1),
		  map((sponsor: ISponsor) => {
			if (sponsor && sponsor.id) {
			  return sponsor;
			} else {
			  this.router.navigate(['/sponsors']).then();
			}
		  })
		); */
	}

}

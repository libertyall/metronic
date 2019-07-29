import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Category} from "./_model/category.model";

@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {

	constructor(// private sponsorService: SponsorService,
		private router: Router) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
		return of([
			{id: '123', title: 'lala'},
			{id: '43', title: 'puasd'},
			{id: '173', title: 'ipjsef'},
			{id: '1993', title: 'ipasdasdasdasdasdajsef'}
		]);
	}
}

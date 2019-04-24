import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IStaticPage } from '../../../../../shared/interfaces/static-page.interface';
import { ApplicationService } from '../../../../../shared/services/application.service';

@Injectable()
export class StaticPageResolver implements Resolve<IStaticPage> {

	constructor(private applicationService: ApplicationService,
				private router: Router) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStaticPage> {

		return of(null);
		/* return this.applicationService.getStaticPageByLink(route.routeConfig.path).pipe(
		 take(1),
		 map((staticPage: IStaticPage) => {
		 console.log(staticPage);
		 if (staticPage) {
		 return staticPage;
		 } else {
		 this.router.navigate(['/']).then();
		 }
		 })
		 ); */
	}

}

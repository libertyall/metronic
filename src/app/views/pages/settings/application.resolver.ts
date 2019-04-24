import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { ApplicationService } from '../../../shared/services/application.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ApplicationResolver implements Resolve<IApplication> {

	constructor(private applicationService: ApplicationService) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApplication> {
		return this.applicationService.getCurrentApplication().pipe(
			map(app => {
				return app;
			}),
			take(1)
		);
	}
}

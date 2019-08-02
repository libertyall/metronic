import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Category} from "./_model/category.model";
import {EntityDataService} from "@ngrx/data";

@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {

	constructor(private entityDataService: EntityDataService) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
		return <Observable<Category[]>>this.entityDataService.getService('Category').getAll();
	}
}

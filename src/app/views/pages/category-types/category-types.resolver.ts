import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ICategoryType} from '../../../shared/interfaces/category-type.interface';
import {CategoryTypeService} from '../../../shared/services/category-type/category-type.service';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoryTypesResolver implements Resolve<ICategoryType[]> {

	constructor(private categoryTypeService: CategoryTypeService) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoryType[]> {
		return this.categoryTypeService.categoryTypes$.pipe(
			map((categoryTypes) => {
				console.log(categoryTypes);
				return categoryTypes;
			})
		);
	}

}

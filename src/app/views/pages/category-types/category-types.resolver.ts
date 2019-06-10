import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { first, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { selectAllCategoryTypes } from '../../../core/category-types/_selectors/category-type.selectors';
import { AllCategoryTypesRequested } from '../../../core/category-types/_actions/category-types.actions';

@Injectable()
export class CategoryTypesResolver implements Resolve<ICategoryType[]> {

	constructor(private categoryTypeService: CategoryTypeService,
				private store: Store<AppState>) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoryType[]> {
		this.store.dispatch(new AllCategoryTypesRequested());
		return this.waitForCategoryTypesToLoad();
	}

	waitForCategoryTypesToLoad(): Observable<ICategoryType[]> {
		return this.store.pipe(
			select(selectAllCategoryTypes),
			map(categoryTypes => {
				console.log(categoryTypes);
				return categoryTypes;
			})
		);
	}

}

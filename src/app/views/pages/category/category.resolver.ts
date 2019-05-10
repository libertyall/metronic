import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ICategory} from '../../../shared/interfaces/category.interface';
import {CategoryService} from '../../../shared/services/category/category.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../core/reducers';
import {filter, first, tap} from 'rxjs/operators';
import {selectCategoryById} from '../../../core/category/_selectors/category.selectors';
import {CategoryRequested} from '../../../core/category/_actions/category.actions';

@Injectable()
export class CategoryResolver implements Resolve<ICategory> {

	constructor(private categoryService: CategoryService,
				private store: Store<AppState>) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory> {
		return this.waitForCategoryToLoad(route.params['categoryId']);
	}

	waitForCategoryToLoad(categoryId: string): Observable<ICategory> {
		return this.store.pipe(
			select(selectCategoryById(categoryId)),
			tap(category => {
				if (!category) {
					return this.store.dispatch(new CategoryRequested({categoryId}));
				}
			}),
			filter(category => !!category),
			first()
		);
	}

}

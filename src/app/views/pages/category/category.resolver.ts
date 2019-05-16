import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ICategory} from '../../../shared/interfaces/category.interface';
import {CategoryService} from '../../../shared/services/category/category.service';
import {select, Store} from '@ngrx/store';
import {filter, first, map, tap} from 'rxjs/operators';
import {selectCategoryById} from '../../../core/category/_selectors/category.selectors';
import {CategoryOnServerCreated} from '../../../core/category/_actions/category.actions';
import {AppState} from '../../../core/reducers';

@Injectable()
export class CategoryResolver implements Resolve<ICategory> {

	constructor(private categoryService: CategoryService, 
				private store: Store<AppState>) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory> {
		return this.waitForCategoryToLoad(route.params['categoryId']);
	}

	waitForCategoryToLoad(categoryId: string): Observable<ICategory> {
			select(selectCategoryById(categoryId)),
			map(category => {
				if (!category) {
					return this.categoryService.initNewCategory().pipe(map((newCategory: ICategory) => {
							return this.store.dispatch(new CategoryOnServerCreated({category: newCategory}));
						})
					);
				}
				return category;
			}),
			// filter(category => !!category),
			first();
	}

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { select, Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { selectCategoryById } from '../../../core/category/selectors/category.selectors';
import { AppState } from '../../../core/reducers';
import {
	AllCategoriesRequested, CategoryCreated, CategoryRequested
} from '../../../core/category/actions/category.actions';

@Injectable()
export class CategoryResolver implements Resolve<ICategory> {

	constructor(private categoryService: CategoryService,
				private router: Router,
				private store: Store<AppState>) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory> {
		this.store.dispatch(new AllCategoriesRequested());
		return this.waitForCategoryToLoad(route.params['categoryId'], route.routeConfig.path === 'create');
	}


	waitForCategoryToLoad(categoryId: string, createNewCategory: boolean): Observable<ICategory> {
		return this.store.pipe(
			select(selectCategoryById(categoryId)),
			map(category => {
				if (!category) {
					if (createNewCategory) {
						console.log('no cat found - create it!');
						const newCategory = this.categoryService.initNewCategory();
						this.store.dispatch(new CategoryCreated({
							category: newCategory
						}));
						return newCategory;
					} else {
						this.router.navigate(['/categories']).then(() => console.log('no cat found'));
					}
				}
				this.store.dispatch(new CategoryRequested({
					categoryId: categoryId
				}));
				return category;
			}),
			first()
		);
	}

}

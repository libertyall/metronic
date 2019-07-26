import { BaseDataSource } from '../../../core/_base/crud';
import { Category } from '../_model/category.model';
import { delay } from 'rxjs/operators';
import { EntityCollectionService, EntityServices, QueryParams } from '@ngrx/data';

export class CategoriesDataSource extends BaseDataSource {

	constructor(private categoryService: any) {
		super();

		this.loading$ = this.categoryService.loading$;

		this.loading$.subscribe(t => console.log(t));

		// this.isPreloadTextViewed$ = categoryService.loading$;

		this.categoryService.getAll().pipe(
			delay(2500)
		).subscribe((categories: Category[]) => {
			console.log(categories);
			this.paginatorTotalSubject.next(categories.length);
			this.entitySubject.next(categories);
		});
	}
}

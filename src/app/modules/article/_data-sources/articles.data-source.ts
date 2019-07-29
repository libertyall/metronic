import { BaseDataSource } from '../../../core/_base/crud';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

export class ArticlesDataSource extends BaseDataSource {

	constructor(/* private categoryService: any */) {
		super();

		this.loading$ = of(false); // this.categoryService.loading$;

		/* this.categoryService.getAll().pipe(
			delay(2500)
		).subscribe((categories: Category[]) => {
			console.log(categories);
			this.paginatorTotalSubject.next(categories.length);
			this.entitySubject.next(categories);
		});*/
	}
}

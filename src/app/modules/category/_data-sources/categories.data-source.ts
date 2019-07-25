import {BaseDataSource} from "../../../core/_base/crud";
import {CategoryService} from "../_services/category.service";
import {Category} from "../_model/category.model";

export class CategoriesDataSource extends BaseDataSource {

	constructor(private categoryService: CategoryService) {
		super();

		this.loading$ = categoryService.loading$;

		// this.isPreloadTextViewed$ = categoryService;

		categoryService.getAll().subscribe((categories: Category[]) => {
			this.paginatorTotalSubject.next(categories.length);
			this.entitySubject.next(categories);
		});
	}
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../../shared/services/category-type/category-type.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'category-statistics',
	templateUrl: './category-statistics.component.html'
})
export class CategoryStatisticsComponent {

	categories$: Observable<ICategory[]>;
	categoryTypes$: Observable<ICategoryType[]>;

	constructor(private categoryService: CategoryService,
				private categoryTypeService: CategoryTypeService) {
		this.categories$ = categoryService.categories$;
		this.categoryTypes$ = categoryTypeService.categoryTypes$;
	}

}

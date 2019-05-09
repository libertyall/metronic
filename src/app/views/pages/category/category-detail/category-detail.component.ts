import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../../shared/services/category-type/category-type.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'category-detail',
	templateUrl: 'category-detail.component.html'
})

export class CategoryDetailComponent implements OnInit {

	public category: ICategory;
	public categoryTypes$: Observable<ICategoryType[]>;

	constructor(private categoryService: CategoryService,
				private categoryTypeService: CategoryTypeService,
				private router: Router,
				private route: ActivatedRoute) {
		this.categoryTypes$ = categoryTypeService.categoryTypes$;
	}

	ngOnInit() {
		this.route.data.subscribe((data: { category: ICategory }) => this.category = data.category);
	}

	removeCategory(category: ICategory) {
		this.categoryService.removeCategory(category.id).then(
			() => this.router.navigate(['/categories']).then(),
			(error: any) => console.log(error)
		);
	}

}

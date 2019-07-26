import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../_model/category.model';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { delay, map } from 'rxjs/operators';

@Component({
	selector: 'kt-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	@ViewChild('list', { static: false, read: ElementRef }) listElement: ElementRef;

	categoryService: EntityCollectionService<Category>;
	selectedCategory$: Observable<Category>;

	loading$: Observable<boolean>;

	constructor(private entityServices: EntityServices) {
		this.categoryService = entityServices.getEntityCollectionService('Category');
	}

	ngOnInit() {
	}

	setSelectedCategory($event: Category): void {
		this.selectedCategory$ = this.categoryService.getByKey($event.id).pipe(delay(3000), map(category => category));

		this.loading$ = this.categoryService.loading$;

		this.loading$.subscribe(t => console.log(t));
	}

	cancelEdit(): void {
		this.selectedCategory$ = null;
	}
}

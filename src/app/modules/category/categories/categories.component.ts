import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from "../_model/category.model";

@Component({
	selector: 'kt-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	selectedCategory: Category;

	constructor() {
	}

	ngOnInit() {
	}

	setSelectedCategory($event: Category): void {
		this.selectedCategory = $event;
	}
}

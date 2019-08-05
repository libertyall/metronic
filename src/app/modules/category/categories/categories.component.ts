import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Category} from '../_model/category.model';
import {Observable} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {Sponsor} from "../../sponsor/_model/sponsor.class";

@Component({
	selector: 'kt-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	@ViewChild('list', { static: false, read: ElementRef }) listElement: ElementRef;

	selectedCategory: Category;
	categories: Category[];

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.data.subscribe((data: { categories: Category[] }) => this.categories = data.categories);
	}

	setSelectedCategory($event: Category): void {
		this.selectedCategory = $event;
	}

	cancelEdit(): void {
		this.selectedCategory = null;
	}
}

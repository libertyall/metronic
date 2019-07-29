import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../category/_model/category.model';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'locations',
	templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

	// public locations$: Observable<ILocation[]>;
	// public categories$: Observable<Category[]>;

	constructor(/* public categoryService: CategoryService,
				 private locationService: LocationService */) {
		// this.locations$ = locationService.locations$;
		// this.categories$ = this.categoryService.getCategoriesByCategoryType('location.types');
	}

	ngOnInit() {
	}

}

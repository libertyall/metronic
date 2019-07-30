import {Component, OnInit} from '@angular/core';
import {Category} from "../../category/_model/category.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../_model/location.class";

@Component({
	selector: 'kt-location-list',
	templateUrl: './location-list.component.html',
	styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

	locations: Location[];
	categories: Category[];

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.parent.data.subscribe((data: { locations: Location[], categories: Category[] }) => {
			this.locations = data.locations;
			this.categories = data.categories;
		});
	}

}

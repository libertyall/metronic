import { Component, OnInit } from '@angular/core';
import { Location } from '../_model/location.class';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'kt-location-detail',
	templateUrl: './location-detail.component.html',
	styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

	location: Location;

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.data.subscribe((data: { location: Location }) => this.location = data.location);
	}

}

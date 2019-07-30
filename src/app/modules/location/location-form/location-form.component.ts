import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../category/_model/category.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "../_model/location.class";
import {EventEmitterService} from "../../../shared/services/event-emitter.service";
import {Article} from "../../article/_model/article.model";
import {Observable, of} from "rxjs";

@Component({
	selector: 'kt-location-form',
	templateUrl: './location-form.component.html',
	styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

	form: FormGroup;
	categories: Category[];
	location: Location;
	savedLocation: Location;

	articles$: Observable<Article[]>;
	galleries$: Observable<any>;

	titleMaxLength = 150;

	constructor(private fb: FormBuilder,
				private router: Router,
				private eventEmitterService: EventEmitterService,
				private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.parent.data.subscribe((data: { categories: Category[] }) => this.categories = data.categories);
		this.route.data.subscribe((data: { location: Location }) => this.location = this.savedLocation = data.location);
		this.initForm(this.location);
	}

	initForm(location) {
		this.form = this.fb.group({
			title: [location.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
			fupaLink: location.fupaLink,
			assignedCategory: [location.assignedCategory, [Validators.required]],
			prices: location.prices,
			opening: this.location.opening,
			text: this.location.text,
			isImported: this.location.isImported
			// address: this.initAddress(),
			// creation: this.initCreation(),
			// assignedContacts: this.initAssignedContacts()
		});
	}

	createLocation(redirect = false): void {
		console.log('create location');
	}

	cancel() {
		this.redirectToList();
	}

	redirectToList() {
		this.router.navigate(['/sponsors']).then();
	}

	removeLocation(location: Location, redirect: boolean) {
		this.eventEmitterService.emitValue({
			type: 'delete',
			entity: location
		});

		if (redirect) {
			this.redirectToList();
		}
	}

	resetForm(): void {
		this.initForm(this.savedLocation);
	}

	onSelectAssignedItemsTab($event): void {
		if (!this.articles$ || !this.galleries$) {
			console.log('Now we can load galleries and articles to', $event);
			this.galleries$ = this.articles$ = of([]);
		}
	}

}

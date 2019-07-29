import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Sponsor} from "../_model/sponsor.class";
import {Category} from "../../category/_model/category.model";
import {LayoutUtilsService} from "../../../core/_base/crud";
import {TranslateService} from "@ngx-translate/core";
import {EventEmitterService} from "../../../shared/services/event-emitter.service";
import {map} from "rxjs/operators";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sponsor-list',
	templateUrl: './sponsor-list.component.html',
	styleUrls: [
		'sponsor-list.component.scss'
	]
})
export class SponsorListComponent implements OnInit, OnDestroy {

	sponsors$: Observable<Sponsor[]>;
	categories$: Observable<Category[]>;
	categoryFilter: Category[];
	form: FormGroup;

	private sub: Subscription;

	constructor(// private alertService: AlertService,
		private eventEmitterService: EventEmitterService,
		private media: MediaMatcher,
		private fb: FormBuilder,
		private layoutUtilsService: LayoutUtilsService,
		private translateService: TranslateService,
		// private categoryService: CategoryService,
		// private mediaItemService: MediaItemService,
		// private sponsorService: SponsorService
	) {
		// this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
		// this.sponsors$ = sponsorService.sponsors$;
	}

	ngOnInit() {
		const sponsor: Sponsor = {
			title: '12345',
			displayInFooter: false,
			description: 'aslkdöakdölakdasdaösdasd',
			assignedCategories: [
				{
					id: '12',
					title: 'Klaus-Fischer-Schule'
				},
				{
					id: 'asd',
					title: 'SFW Echo'
				}
			],
			internalInfo: '',
			contact: {
				name: 'Tester 123',
				email: 'test@test.de',
				fax: '12313',
				phoneWork: '1234567890'
			},
			revenue: 341
		};
		let sponsors = [];
		for (let i = 0; i < 14; i++) {
			sponsors.push(sponsor);
		}
		this.sponsors$ = of(sponsors);
		/* this.categories$.pipe(
			map((categories: Category[]) => {
				return categories.forEach((category: Category) => {
					return category;
				});
			}),
			tap(categories => console.log(categories))
		); */
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	deleteAllSponsors(): void {
		this.sub = this.sponsors$.pipe(map((sponsors: Sponsor[]) => this.eventEmitterService.emitValue({
			action: 'deleteAll',
			type: 'sponsors',
			entity: sponsors
		}))).subscribe();
	}

	/* this.sponsorService.removeSponsor(sponsor)
	  .then(() => this.mediaItemService.removeMediaItem(sponsor.id),
		(error: any) => this.alertService.showSnackBar('error', error.message)
	  )
	  .then(() => this.alertService.success('general.sponsors.list.deleted', true))
	  .catch((error: any) => this.alertService.error(error.message)); */

	setFilters(assignedCategories: Category[]) {
		this.categoryFilter = assignedCategories;
	}

}

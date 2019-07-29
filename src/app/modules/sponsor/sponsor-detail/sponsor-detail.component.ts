import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Sponsor} from "../_model/sponsor.class";
import {Category} from "../../category/_model/category.model";
import {MediaItem} from "../../../shared/modules/upload/_model/media-item.class";
import {EventEmitterService} from "../../../shared/services/event-emitter.service";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sponsor-detail',
	templateUrl: './sponsor-detail.component.html',
	styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {

	public sponsor: Sponsor;
	public categories$: Observable<Category[]>;
	public sponsorLogo$: Observable<MediaItem>;

	constructor(private route: ActivatedRoute,
				private eventEmitterService: EventEmitterService,
				// private sponsorService: SponsorService,
				private router: Router,
				/* private alertService: AlertService,
				private mediaItemService: MediaItemService,
				private categoryService: CategoryService */) {
		// this.categories$ = categoryService.categories$;
	}

	ngOnInit() {
		this.route.data.subscribe((data: { sponsor: Sponsor }) => this.sponsor = data.sponsor);

		if (this.sponsor && !this.sponsorLogo$) {
			// this.sponsorLogo = this.mediaItemService.getCurrentImage(['sponsors', 'profile'], this.sponsor.id);
		}
	}

	removeSponsor(sponsor: Sponsor, redirect: boolean) {
		this.eventEmitterService.emitValue({
			action: 'delete',
			type: 'sponsors',
			entity: sponsor
		});

		if (redirect) {
			this.redirectToList();
		}
		/* this.sponsorService.removeSponsor(sponsor)
		  .then(() => this.alertService.showSnackBar('success', 'general.sponsors.list.deleted'),
			(error: any) => this.alertService.showSnackBar('error', error.message)
		  )
		  .then(() => this.redirectToList())
		  .catch((error: any) => this.alertService.showSnackBar('error', error.message)); */
	}

	redirectToList() {
		this.router.navigate(['/sponsors']).then();
	}
}

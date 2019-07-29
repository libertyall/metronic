import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Sponsor} from "../_model/sponsor.class";
import {Category} from "../../category/_model/category.model";
import {EventEmitterService} from "../../../shared/services/event-emitter.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sponsor-form',
	templateUrl: './sponsor-form.component.html'
})
export class SponsorFormComponent implements OnInit {

	public sponsor: Sponsor;
	public form: FormGroup;
	public categories: Category[];
	public titleMaxLength = 50;
	public savedSponsor: Sponsor;

	/* public uploaderConfig: IUploaderConfig = {
	  autoUpload: true,
	  showDropZone: true,
	  removeAfterUpload: true,
	  showQueue: false,
	  headerTitle: 'general.sponsors.edit.imageUrl'
	};

	public uploaderOptions: IUploaderOptions = {
	  assignedObjects: ['sponsors', 'profile'],
	  itemId: '',
	  queueLimit: 1,
	  allowedMimeType: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
	  allowedFileType: ['image']
	}; */

	constructor(private route: ActivatedRoute,
				private eventEmitterService: EventEmitterService,
				// private alertService: AlertService,
				private fb: FormBuilder,
				private router: Router,
				/* private mediaItemService: MediaItemService,
				private sponsorService: SponsorService,
				public categoryService: CategoryService */) {
		// this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
	}

	ngOnInit() {
		this.route.data.subscribe((data: { sponsor: Sponsor, categories: Category[] }) => {
			this.sponsor = this.savedSponsor = data.sponsor;
			this.categories = data.categories;
			// this.uploaderOptions.itemId = this.sponsor.id;
		});

		this.initForm(this.sponsor);

		/* this.form.valueChanges.pipe(
			debounceTime(1000),
			distinctUntilChanged()
		).subscribe((changes: Sponsor) => {
			if (this.form.valid) {
				this.sponsor = Object.assign({}, this.sponsor, changes);
				// this.saveSponsor();
			}
		}); */
	}

	initForm(sponsor: Sponsor): void {
		this.form = this.fb.group({
			title: [sponsor.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
			externalLink: sponsor.externalLink,
			description: sponsor.description,
			assignedCategories: [sponsor.assignedCategories, [Validators.required]],
			startDate: sponsor.startDate ? sponsor.startDate : new Date(),
			endDate: sponsor.endDate ? sponsor.endDate : '',
			internalInfo: sponsor.internalInfo,
			displayInFooter: sponsor.displayInFooter,
			contact: this.fb.group({
				email: sponsor.contact.email,
				phoneWork: sponsor.contact.phoneWork,
				fax: sponsor.contact.fax,
				name: [sponsor.contact.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
			}),
			revenue: sponsor.revenue
		});
	}

	createSponsor(redirect = false): void {
		console.log('create sponsor');
		/* let action;
		if (this.sponsor.id) {
		  action = this.sponsorService.updateSponsor(this.sponsor.id, this.sponsor);
		} else {
		  action = this.sponsorService.createSponsor(this.sponsor);
		}
		action.then(() => {
		  this.alertService.showSnackBar('success', 'general.applications.updateMessage');
		  if (redirect) {
			this.redirectToList();
		  }
		},
		  (error: any) => this.alertService.showSnackBar('error', error.message)
		); */
	}

	cancel() {
		this.redirectToList();
	}

	redirectToList() {
		this.router.navigate(['/sponsors']).then();
	}

	/* uploadCompleted(mediaItemId: string) {
	  if (!this.sponsor.id) {
		this.sponsor.id = mediaItemId;
	  }
	} */

	removeSponsor(sponsor: Sponsor, redirect: boolean) {
		this.eventEmitterService.emitValue({
			type: 'delete',
			entity: sponsor
		});

		if (redirect) {
			this.redirectToList();
		}
		/* this.sponsorService.removeSponsor(sponsor)
		.then(() => this.alertService.showSnackBar('success', 'general.sponsors.list.deleted'))
		.then(() => this.redirectToList())
		.catch((error: any) => this.alertService.showSnackBar('error', error.message)); */
	}

	resetForm(): void {
		this.initForm(this.savedSponsor);
		// this.form.reset();
	}

}

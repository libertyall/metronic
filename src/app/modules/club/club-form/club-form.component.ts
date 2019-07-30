import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Club} from "../_model/club.model";
import {Category} from "../../category/_model/category.model";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-form',
	templateUrl: 'club-form.component.html',
	styleUrls: ['./club-form.component.scss']
})
export class ClubFormComponent implements OnInit {

	public club: Club;
	/* public articles$: Observable<IArticle[]>;
	public locations$: Observable<ILocation[]>;
	public members$: Observable<IMember[]>;
	public positions$: Observable<ICategory[]>; */
	private savedClub: Club;

	form: FormGroup;
	titleMaxLength: 255;
	categories: Category[];

	constructor(/* public clubService: ClubService,
				private alertService: AlertService,
				private articleService: ArticleService,
				private locationService: LocationService,
				private memberService: MemberService,
				private categoryService: CategoryService, */
				private fb: FormBuilder,
				private cd: ChangeDetectorRef,
				private route: ActivatedRoute,
				private router: Router) {
		/* this.locations$ = locationService.locations$;
		this.members$ = memberService.members$;
		this.articles$ = articleService.articles$;
		this.positions$ = categoryService.getCategoriesByCategoryType('club.position.types'); */
	}

	ngOnInit() {
		this.route.data.subscribe((data: { club: Club }) => {
			this.club = this.savedClub = data.club;
			// this.savedClub = Object.freeze(Object.assign({}, this.club));
		});

		this.initForm(this.club);
	}

	initForm(club: Club): void {
		this.form = this.fb.group({});
	}

	removeClub(club: Club, redirect = false) {
		/*this.clubService.removeClub(club)
			.then(() => this.alertService.showSnackBar('success', 'general.clubs.edit.removedClub'))
			.then(() => this.redirectToList(),
				(error: any) => this.alertService.showSnackBar('error', error.message)); */
	}

	createClub(): void {
		console.log(this.club);
		/*this.savedClub = Object.assign({}, this.club, $event);
		if (!_.isEqual(this.club, this.savedClub)) {
			this.club = this.savedClub;

			let action;
			this.club = Object.assign({}, this.club, $event);

			if (this.club.id) {
				action = this.clubService.updateClub(this.club.id, this.club);
			} else {
				action = this.clubService.createClub(this.club);
			}
			action.then(() => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
				(error: any) => this.alertService.showSnackBar('error', error.message)
			).catch((error: any) => {
				this.alertService.showSnackBar('error', error.message);
			});
		} */
	}

	cancel() {
		this.redirectToList();
	}

	redirectToList() {
		this.router.navigate(['/clubs']).then();
	}

	resetForm() {
		// this.initForm(this.savedClub);
	}

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Club} from "../../_model/club.model";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-form-main',
	templateUrl: './club-form-main.component.html'
})
export class ClubFormMainComponent implements OnInit {

	club: Club;
	form: FormGroup;
	titleMinLength = 10;
	titleMaxLength = 255;

	members = [];
	/* @Input() locations: ILocation[];
	@Input() members: IMember[];

	@Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

	public uploaderConfig: IUploaderConfig = {
		autoUpload: true,
		showDropZone: true,
		removeAfterUpload: true,
		showQueue: false,
		headerTitle: 'general.clubs.edit.logoUrl',
		showHeader: true,
		placeHolderImage: '/assets/sfw/placeholder/no-club-image-found.jpg'
	};

	public uploaderOptions: IUploaderOptions = {
		assignedObjects: ['clubs', 'profile'],
		itemId: '',
		queueLimit: 1,
		allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
	};

	public froalaOptions: Object = {
		placeholderText: 'Eine Kurzinfo zum Verein ...',
		charCounterCount: true,
		height: '30vh'
	}; */

	constructor(private route: ActivatedRoute,
				private fb: FormBuilder) {
	}

	ngOnInit() {
		this.route.data.subscribe((data: { club: Club }) => {
			this.club = data.club;
		});

		this.initForm(this.club);

		/* this.uploaderOptions.itemId = this.club.id;

		this.form.valueChanges.pipe(
			debounceTime(1000),
			distinctUntilChanged()
		).subscribe((changes: IClub) => {
			if (this.form.valid) {
				this.saveClub.emit(changes);
			}
		});*/
	}

	initForm(club: Club): void {
		this.form = this.fb.group({
			title: [this.club.title, [Validators.required, Validators.minLength(this.titleMinLength), Validators.maxLength(this.titleMaxLength)]],
			description: this.club.description,
			assignedLocations: this.club.assignedLocations,
			assignedContact: this.club.assignedContact,
			founding: this.club.founding,
			clubColours: this.club.clubColours,
			homepage: this.club.homepage,
			fussballDeClubUrl: this.club.fussballDeClubUrl,
			fussballDeClubId: this.club.fussballDeClubId,
			creation: this.initCreation()
		});
	}

	initCreation(): FormGroup {
		return this.fb.group({
			at: this.club.creation.at,
			from: this.club.creation.by
		});
	}

}

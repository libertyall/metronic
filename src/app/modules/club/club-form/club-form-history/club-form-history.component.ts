import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Club} from "../../_model/club.model";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-form-history',
	templateUrl: './club-form-history.component.html',
	styleUrls: ['./club-form-history.component.scss']
})
export class ClubFormHistoryComponent implements OnInit {

	// @Output() saveClub: EventEmitter<Club> = new EventEmitter<IClub>(false);

	public form: FormGroup;
	public club: Club;

	constructor(private route: ActivatedRoute,
				private fb: FormBuilder) {
	}

	ngOnInit() {
		this.route.parent.data.subscribe((data: { club: Club }) => {
			this.club = data.club;
		});

		// this.initForm(this.club);

		this.form = this.fb.group({
			history: this.club.history
		});

		/* this.form.valueChanges.pipe(
			debounceTime(1000),
			distinctUntilChanged()
		).subscribe((changes: IClub) => {
			if (this.form.valid) {
				this.saveClub.emit(changes);
			}
		}); */
	}

}

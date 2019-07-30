import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'club-honorary-table',
	templateUrl: './club-honorary-table.component.html',
	styleUrls: ['./club-honorary-table.component.scss']
})
export class ClubHonoraryTableComponent implements OnInit {

	@Input() members: any[];
	@Input() articles: any[];

	public form: FormGroup;

	constructor(private fb: FormBuilder,
				/* private alertService: AlertService,
				private memberService: MemberService */) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			honoraries: this.initHonoraries()
		});

		/* this.form.valueChanges.pipe(
		  debounceTime(500),
		  distinctUntilChanged()
		).subscribe((changes: {
		  honoraries: {
			honoraryDate: any;
			honoraryArticle: string;
		  }[];
		}) => {
		  changes.honoraries.forEach((honorary: {
			honoraryDate: any;
			honoraryArticle: string;
		  }) => {
			if (honorary.honoraryArticle && honorary.honoraryDate) {
			  const idx = changes.honoraries.indexOf(honorary);
			  this.members[idx].honoraryArticle = honorary.honoraryArticle;
			  this.members[idx].honoraryDate = honorary.honoraryDate;
			  this.memberService.updateMember(this.members[idx]).then(
				() => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
				(error: any) => this.alertService.showSnackBar('error', error.message));
			}
		  });
		}); */
	}

	initHonoraries(): FormArray {
		const formArray = [];
		if (this.members) {
			for (let i = 0; i < this.members.length; i++) {
				formArray.push(this.fb.group({
					honoraryDate: [
						this.members[i].honoraryDate
							? new Date(this.members[i].honoraryDate.seconds * 1000)
							: '',
						[Validators.required]],
					honoraryArticle: [this.members[i].honoraryArticle, [Validators.required]]
				}));
			}
		}
		return this.fb.array(formArray);
	}

}

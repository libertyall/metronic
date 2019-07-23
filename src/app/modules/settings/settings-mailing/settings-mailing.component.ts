import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Application} from "../_model/application.model";
import {MailList} from "../_model/mail-list.class";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-mailing',
	templateUrl: './settings-mailing.component.html',
	styleUrls: ['./settings-mailing.component.scss']
})
export class SettingsMailingComponent implements OnInit {

	@Input() application: Application;
	@Output() saveApplication: EventEmitter<Application> = new EventEmitter<Application>(false);
	@Output() setFormErrors: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	minLength10 = 10;
	maxLength50 = 50;

	public form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			mailing: this.initMailing()
		});

		this.form.valueChanges.pipe(
			debounceTime(1500),
			distinctUntilChanged()
		).subscribe((changes: MailList[]) => {

			this.setFormErrors.emit(false);
			const controls = this.form.controls;
			if (this.form.invalid && this.form.touched) {
				Object.keys(controls).forEach(controlName =>
					controls[controlName].markAsTouched()
				);

				this.setFormErrors.emit(true);
				return;
			}

			this.application = Object.assign({}, this.application, changes);
			this.saveApplication.emit(this.application);
		});
	}

	initMailing() {
		const formArray = [];
		if (this.application.mailing) {
			for (let i = 0; i < this.application.mailing.length; i++) {
				formArray.push(this.initMailList(this.application.mailing[i]));
			}
		}
		return this.fb.array(formArray);
	}

	initMailList(mailList: MailList): FormGroup {
		return this.fb.group({
			title: [mailList.title, [Validators.required, Validators.minLength(this.minLength10), Validators.maxLength(this.maxLength50)]],
			emails: [mailList.emails ? mailList.emails : [], [Validators.required]],
			isActive: mailList.isActive
		});
	}

	addMailer(): void {
		const control = this.form.get('mailing') as FormArray;
		control.push(this.initMailList({title: '', emails: [], isActive: true}));
	}

	deleteMailer(i: number): void {
		const control = this.form.get('mailing') as FormArray;
		control.removeAt(i);
	}

}

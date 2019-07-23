import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Application} from "../_model/application.model";
import {Calendar} from "../_model/calendar.model";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-calendars',
	templateUrl: './settings-calendars.component.html',
	styleUrls: ['./settings-calendars.component.scss']
})
export class SettingsCalendarsComponent implements OnInit {

	@Input() application: Application;
	@Output() saveApplication: EventEmitter<Application> = new EventEmitter<Application>(false);
	@Output() setFormErrors: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	form: FormGroup;
	minLength15 = 15;
	minLength10 = 10;
	maxLength255 = 255;

	cssClasses: string[] = ['primary', 'secondary', 'success' , 'warning', 'danger', 'info', 'light' , 'dark'];

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			assignedCalendars: this.initCalendars()
		});

		this.form.valueChanges.pipe(
			debounceTime(1000),
			// distinctUntilChanged()
		).subscribe((changes: Calendar[]) => {

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

	initCalendars(): FormArray {
		const formArray = [];
		if (this.application.assignedCalendars) {
			for (let i = 0; i < this.application.assignedCalendars.length; i++) {
				formArray.push(this.initCalendar(this.application.assignedCalendars[i]));
			}
		}
		return this.fb.array(formArray);
	}

	initCalendar(calendar: Calendar): FormGroup {
		return this.fb.group({
			link: [calendar.link, [Validators.required, Validators.minLength(this.minLength15)]],
			title: [calendar.title, [Validators.required, Validators.minLength(this.minLength10)]],
			isActive: calendar.isActive,
			cssTitle: calendar.cssTitle
		});
	}

	addCalendar() {
		const control = this.form.get('assignedCalendars') as FormArray;
		control.push(this.initCalendar({title: '', link: '', isActive: true, cssTitle: ''}));
	}

	deleteCalendar(i: number) {
		const control = this.form.get('assignedCalendars') as FormArray;
		control.removeAt(i);
	}

}

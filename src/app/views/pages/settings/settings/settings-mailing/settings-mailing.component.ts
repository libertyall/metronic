import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApplication } from '../../../../../shared/interfaces/application.interface';
import { IMailList } from '../../../../../shared/interfaces/mail-list.interface';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-mailing',
	templateUrl: './settings-mailing.component.html',
	styleUrls: ['./settings-mailing.component.scss']
})
export class SettingsMailingComponent implements OnInit {

	@Input() application: IApplication;
	@Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

	selectable = true;
	removable = true;
	addOnBlur = true;

	typesOptionsArray: string[][] = [];

	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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
		).subscribe((changes: IMailList[]) => {
			console.log(changes);
			/* if (this.form.valid) {
				this.application = Object.assign({}, this.application, changes);
				this.saveApplication.emit(this.application);
			} */
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

	initMailList(mailList: IMailList): FormGroup {
		return this.fb.group({
			title: [mailList.title, [Validators.required]],
			emails: [mailList.emails ? mailList.emails : [], [Validators.required]],
			isActive: mailList.isActive
		});
	}

	addMailList() {
		const control = this.form.get('mailing') as FormArray;
		control.push(this.initMailList({ title: '', emails: [], isActive: true }));
	}

	deleteMailList(i: number) {
		const control = this.form.get('mailing') as FormArray;
		control.removeAt(i);
	}

	addOpt(event: MatChipInputEvent, index: number): void {
		const input = event.input;
		const value = event.value;

		if ((value || '').trim()) {
			if (!this.typesOptionsArray[index]) {
				this.typesOptionsArray[index] = [];
			}
			this.typesOptionsArray[index].push(value.trim());

		}
		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	removeOpt(opt: string, index: number): void {
		const optIndex = this.typesOptionsArray[index].indexOf(opt);
		if (optIndex >= 0) {
			this.typesOptionsArray[index].splice(optIndex, 1);
		}
	}

}

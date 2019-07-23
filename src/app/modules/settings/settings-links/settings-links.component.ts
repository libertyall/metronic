import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Application} from "../_model/application.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {MailList} from "../_model/mail-list.class";
import {Link} from "../_model/link.model";

export function validateUrl(control: AbstractControl) {
	let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
	return control.value.match(new RegExp(expression));
}

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings-links',
	templateUrl: './settings-links.component.html',
	styleUrls: ['./settings-links.component.scss']
})
export class SettingsLinksComponent implements OnInit {

	@Input() application: Application;
	@Output() saveApplication: EventEmitter<Application> = new EventEmitter<Application>(false);
	@Output() setFormErrors: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	minLength10 = 10;
	maxLength50 = 50;
	maxLength255 = 255;

	linkTargets: string[] = ['_blank', '_self'];

	public form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			links: this.initLinks()
		});

		this.form.valueChanges.pipe(
			debounceTime(1500),
			distinctUntilChanged()
		).subscribe((changes: MailList[]) => {

			this.setFormErrors.emit(false);
			const controls = this.form.controls;
			if (this.form.invalid && this.form.touched) {
				console.log(this.form);
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

	initLinks() {
		const formArray = [];
		if (this.application.links) {
			for (let i = 0; i < this.application.links.length; i++) {
				formArray.push(this.initLink(this.application.links[i]));
			}
		}
		return this.fb.array(formArray);
	}

	initLink(link: Link): FormGroup {
		return this.fb.group({
			title: [link.title, [Validators.required, Validators.minLength(this.minLength10), Validators.maxLength(this.maxLength50)]],
			url: [link.url, [Validators.required, Validators.minLength(this.minLength10), validateUrl]],
			target: '_blank',
			isActive: true,
			displayInFooter: false,
			displayInHeader: false,
			icon: '',
			isMailLink: false,
		});
	}

	addLink(): void {
		const control = this.form.get('links') as FormArray;
		control.push(this.initLink({title: '', url: '', isActive: true}));
	}

	deleteLink(i: number): void {
		const control = this.form.get('links') as FormArray;
		control.removeAt(i);
	}

}

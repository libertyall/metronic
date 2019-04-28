import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'kt-layout-config-tree',
	templateUrl: './layout-config-tree.component.html',
	styleUrls: ['./layout-config-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutConfigTreeComponent implements OnInit {

	@Input() node;
	@Input() addedPlaceholderText = '';

	form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.buildForm(this.node);
	}

	buildForm(config: any) {
		if (Object.entries(config).length > 0 && config.constructor === Object) {
			this.form = this.createFormGroup(config);

			this.form.valueChanges.subscribe(v => console.log(v));
		}
	}

	createFormGroup(obj: any) {
		let formGroup: { [id: string]: AbstractControl; } = {};

		Object.keys(obj).forEach(key => {
			formGroup[key] = Array.isArray(obj[key]) ? this.generateArrayControl(obj[key]) : obj[key] instanceof Object ? this.createFormGroup(obj[key]) : new FormControl(obj[key]);
		});

		return this.fb.group(formGroup);
	}

	generateArrayControl(item) {
		return new FormControl(item);
	}

	getType(item: any) {
		if (Array.isArray(item)) {
			return 'array';
		}
		return item === true || item === false ? 'boolean' : typeof item;
	}

	getPlaceHolderText(): string {
		if (this.addedPlaceholderText) {
			return this.addedPlaceholderText + '.';
		}
		return '';
	}

}

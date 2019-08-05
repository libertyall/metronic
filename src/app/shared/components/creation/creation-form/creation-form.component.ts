import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Creation } from '../../../_models/creation.class';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'creation-form',
	templateUrl: './creation-form.component.html',
	styleUrls: ['./creation-form.component.scss']
})
export class CreationFormComponent implements OnInit {

	@Input() form: FormGroup;
	// form: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		console.log(this.form);
	}

}

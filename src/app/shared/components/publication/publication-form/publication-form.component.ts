import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'publication-form',
	templateUrl: './publication-form.component.html',
	styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

	@Input() form: FormGroup;

	constructor() {
	}

	ngOnInit() {
	}

}

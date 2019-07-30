import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClubHonorary} from "../../../_model/club-honorary.class";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'honorary-form',
	templateUrl: './honorary-form.component.html',
	styleUrls: ['./honorary-form.component.scss']
})
export class HonoraryFormComponent implements OnInit {

	form: FormGroup;
	@Input() honorary: ClubHonorary;

	articles = [];
	members = [];

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		if (!this.honorary) {
			this.honorary = new ClubHonorary();
		}
		this.initForm(this.honorary);
	}

	initForm(honorary: ClubHonorary): void {
		this.form = this.fb.group({
			assignedArticle: honorary.assignedArticle,
			assignedMember: honorary.assignedMember,
			startDate: honorary.startDate
		});
	}

}

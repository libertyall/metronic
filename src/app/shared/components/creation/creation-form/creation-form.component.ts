import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../../core/auth/_interfaces/user.interface';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'creation-form',
	templateUrl: './creation-form.component.html'
})
export class CreationFormComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() users: IUser[];

	public constructor() {
	}

	ngOnInit() {
		if (!this.form.get('from').value || this.form.get('from').value === 'system') {
			this.form.get('from').setValue('system');
			this.form.disable();
		}
	}

}

import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'creation-date',
	templateUrl: 'creation-date.component.html'
})
export class CreationDateComponent {

	@Input() creation: {
		seconds: number,
		nanoseconds: number
	};
	public moment: any;

	public constructor() {
		this.moment = moment;
	}

}

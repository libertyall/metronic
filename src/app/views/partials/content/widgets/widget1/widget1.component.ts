import { Component, Input, OnInit } from '@angular/core';

export interface Widget1Data {
	title: string;
	desc: string;
	value: string;
	valueClass?: string;
}

@Component({
	selector: 'kt-widget1',
	templateUrl: './widget1.component.html',
	styleUrls: ['./widget1.component.scss']
})
export class Widget1Component implements OnInit {
	@Input() data: Widget1Data[];

	ngOnInit() {
		/* if (!this.data) {
			this.data = shuffle([
				{
					title: 'Member Profit',
					desc: 'Awerage Weekly Profit',
					value: '+$17,800',
					valueClass: 'kt-font-brand'
				}, {
					title: 'Orders',
					desc: 'Weekly Customer Orders',
					value: '+$1,800',
					valueClass: 'kt-font-danger'
				}, {
					title: 'Issue Reports',
					desc: 'System bugs and issues',
					value: '-27,49%',
					valueClass: 'kt-font-success'
				}
			]);
		} */
	}

}

import { Component, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../../core/_base/layout';

@Component({
	selector: 'kt-subheader',
	templateUrl: './subheader.component.html',
})
export class SubheaderComponent implements OnInit {

	layout: string;

	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit(): void {
		this.layout = this.layoutConfigService.getConfig('backend.subheader.layout.selected');
	}
}

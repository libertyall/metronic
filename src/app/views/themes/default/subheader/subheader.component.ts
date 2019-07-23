import { Component, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../../core/_base/layout';

@Component({
	selector: 'kt-subheader',
	templateUrl: './subheader.component.html',
})
export class SubheaderComponent implements OnInit {

	layout: string;
	fluid: boolean;
	clear: boolean;

	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit(): void {
		this.layout = this.layoutConfigService.getConfigValue('subheader.layout');
		this.fluid = this.layoutConfigService.getConfigValue( 'footer.self.width') === 'fluid';
		this.clear = this.layoutConfigService.getConfigValue( 'subheader.clear');
	}
}

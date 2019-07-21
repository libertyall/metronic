import { Component, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../../../core/_base/layout';
import { HtmlClassService } from '../../html-class.service';
import { ToggleOptions } from '../../../../../core/_base/layout/directives/toggle.directive';

@Component({
	selector: 'kt-brand',
	templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit {

	headerLogo: string;
	headerStickyLogo: string;

	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-aside--minimize',
		togglerState: 'kt-aside__brand-aside-toggler--active'
	};

	constructor(private layoutConfigService: LayoutConfigService,
				public htmlClassService: HtmlClassService) {
	}

	ngOnInit(): void {
		this.headerLogo = this.layoutConfigService.getLogo();
		this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
	}
}

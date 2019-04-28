import { Component, OnInit } from '@angular/core';
import { ToggleOptions } from '../../../../../core/_base/metronic';
import { LayoutConfigService } from '../../../../../core/_base/layout';

@Component({
	selector: 'kt-header-mobile',
	templateUrl: './header-mobile.component.html',
	styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

	headerLogo: string;
	asideDisplay: boolean;

	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-header__topbar--mobile-on',
		togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
	};

	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit() {
		this.headerLogo = this.layoutConfigService.getLogo('backend');
		this.asideDisplay = this.layoutConfigService.getConfig('backend.aside.self.display');
	}
}

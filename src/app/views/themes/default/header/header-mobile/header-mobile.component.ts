import { Component, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../../../core/_base/layout';
import { ToggleOptions } from '../../../../../core/_base/layout/directives/toggle.directive';

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
		this.headerLogo = this.layoutConfigService.getLogo();
		this.asideDisplay = this.layoutConfigService.getConfigValue('aside.self.display');
	}
}

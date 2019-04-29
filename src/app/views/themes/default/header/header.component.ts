import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
	NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router
} from '@angular/router';
import * as objectPath from 'object-path';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { LayoutConfigService, LayoutRefService } from '../../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';

@Component({
	selector: 'kt-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

	menuHeaderDisplay: boolean;
	@ViewChild('ktHeader') ktHeader: ElementRef;

	constructor(
		private router: Router,
		private layoutRefService: LayoutRefService,
		private layoutConfigService: LayoutConfigService,
		public loader: LoadingBarService,
		public htmlClassService: HtmlClassService) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.loader.start();
			}
			if (event instanceof RouteConfigLoadStart) {
				this.loader.increment(35);
			}
			if (event instanceof RouteConfigLoadEnd) {
				this.loader.increment(75);
			}
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
				this.loader.complete();
			}
		});
	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		this.menuHeaderDisplay = objectPath.get(config, 'backend.header.menu.self.display.selected');

		if (objectPath.get(config, 'backend.header.self.fixed.desktop.enabled.selected') || objectPath.get(config, 'backend.header.self.fixed.desktop')) {
			// header minimize on scroll down
			this.ktHeader.nativeElement.setAttribute('data-ktheader-minimize', '1');
		}
	}

	ngAfterViewInit(): void {
		this.layoutRefService.addElement('header', this.ktHeader.nativeElement);
	}
}
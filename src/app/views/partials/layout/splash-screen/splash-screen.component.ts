import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService, SplashScreenService } from '../../../../core/_base/layout';

@Component({
	selector: 'kt-splash-screen',
	templateUrl: './splash-screen.component.html',
	styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

	loaderLogo: string;
	loaderType: string;
	loaderMessage: string;

	@ViewChild('splashScreen') splashScreen: ElementRef;

	constructor(private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService) {
	}

	ngOnInit() {
		const loaderConfig = this.layoutConfigService.getConfig('backend.loader');
		this.loaderLogo = objectPath.get(loaderConfig, 'logo');
		this.loaderType = objectPath.get(loaderConfig, 'type.selected');
		this.loaderMessage = objectPath.get(loaderConfig, 'message');

		this.splashScreenService.init(this.splashScreen);
	}
}

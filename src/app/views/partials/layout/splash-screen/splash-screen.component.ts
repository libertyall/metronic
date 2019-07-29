import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

	@ViewChild('splashScreen', {static: true}) splashScreen: ElementRef;

	constructor(private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService) {
	}

	ngOnInit() {
		this.loaderLogo = this.layoutConfigService.getConfigValue('loader.logo');
		this.loaderType = this.layoutConfigService.getConfigValue('loader.type');
		this.loaderMessage = this.layoutConfigService.getConfigValue('loader.message');
		console.log(this.loaderLogo, this.loaderType, this.loaderMessage);

		this.splashScreenService.init(this.splashScreen);
	}
}

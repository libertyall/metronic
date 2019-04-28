import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutConfigService, SplashScreenService } from '../../../core/_base/layout';
import { TranslationService } from '../../../core/_base/metronic';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: [ './auth.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

	today: number = Date.now();
	headerLogo: string;

	constructor(
		private layoutConfigService: LayoutConfigService,
		private translationService: TranslationService,
		private splashScreenService: SplashScreenService) {
	}

	ngOnInit(): void {
		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo('backend');
		this.splashScreenService.hide();
	}
}

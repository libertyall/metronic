import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutConfigService, SplashScreenService } from '../../../core/_base/layout';
import { TranslationService } from '../../../core/_base/metronic';
import * as objectPath from 'object-path';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

	today: number = Date.now();
	headerLogo: string;
	backgroundImage: string = '';
	copyright: string = '';
	mainLogo: string = '';
	pageTitle: string = '';

	constructor(private layoutConfigService: LayoutConfigService,
				private translationService: TranslationService,
				private title: Title,
				private splashScreenService: SplashScreenService) {
	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();

		this.backgroundImage = objectPath.get(config, 'backend.self.body.background-image.selected');
		this.copyright = objectPath.get(config, 'backend.footer.self.copyright');
		this.mainLogo = objectPath.get(config, 'backend.self.mainLogo.selected');
		this.pageTitle = objectPath.get(config, 'backend.self.page.title');

		this.title.setTitle(this.pageTitle);

		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo('backend');
		this.splashScreenService.hide();
	}
}

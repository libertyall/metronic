import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutConfigService, SplashScreenService } from '../../../core/_base/layout';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TranslationService } from '../../../core/_base/layout/services/translation.service';

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

	public articles$ = of([]); // : Observable<IArticle[]>;

	constructor(private layoutConfigService: LayoutConfigService,
				private translationService: TranslationService,
				private title: Title,
				private splashScreenService: SplashScreenService) {
	}

	ngOnInit(): void {
		this.backgroundImage = this.layoutConfigService.getConfigValue('self.body.background-image');
		this.copyright = 'COPYRIGHT TODO';
		this.mainLogo = this.layoutConfigService.getConfigValue('self.mainLogo');
		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();
		this.splashScreenService.hide();
	}
}

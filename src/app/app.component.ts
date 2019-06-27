import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutConfigService, SplashScreenService } from './core/_base/layout';
import { TranslationService } from './core/_base/metronic';
import { locale as enLang } from './core/_config/i18n/en';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr';
import { Title } from '@angular/platform-browser';
import * as objectPath from 'object-path';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

	pageTitle: string;
	loader: boolean;

	private unsubscribe: Subscription[] = [];

	constructor(private translationService: TranslationService,
				private router: Router,
				private layoutConfigService: LayoutConfigService,
				private title: Title,
				private splashScreenService: SplashScreenService) {
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
	}

	ngOnInit(): void {
		this.loader = this.layoutConfigService.getConfig('backend.loader.enabled.selected');

		const routerSubscription = this.router.events.subscribe(event => {
			if (this.loader && event instanceof NavigationEnd) {
				this.splashScreenService.hide();
				window.scrollTo(0, 0);
			}

			setTimeout(() => {
				document.body.classList.add('kt-page--loaded');
			}, 500);
		});
		this.unsubscribe.push(routerSubscription);

		const config = this.layoutConfigService.getConfig();
		this.pageTitle = objectPath.get(config, 'backend.self.page.title');
		this.title.setTitle(this.pageTitle);
	}

	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}

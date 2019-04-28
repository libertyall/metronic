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
import { ApplicationService } from './shared/services/application.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

	title = 'Admin';
	loader: boolean;

	private unsubscribe: Subscription[] = [];

	constructor(private translationService: TranslationService,
				private router: Router,
				private applicationService: ApplicationService,
				private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService) {
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
	}

	ngOnInit(): void {
		this.loader = this.layoutConfigService.getConfig('backend.loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (this.loader && event instanceof NavigationEnd) {
				this.splashScreenService.hide();
				window.scrollTo(0, 0);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}

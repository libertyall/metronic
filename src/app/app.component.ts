import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutConfigService, SplashScreenService } from './core/_base/layout';
import { locale as enLang } from './core/_config/i18n/en';
import { locale as deLang } from './core/_config/i18n/de';
/* import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr'; */
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { TranslationService } from './core/_base/layout/services/translation.service';
import { ApplicationService } from './modules/settings/_services/application.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

	loader: boolean;

	private unsubscribe: Subscription[] = [];

	constructor(private translationService: TranslationService,
				private store: Store<AppState>,
				private router: Router,
				private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService) {
		this.translationService.loadTranslations(enLang, deLang);
		this.translationService.setLanguage('de');
	}

	ngOnInit(): void {
		this.loader = this.layoutConfigService.getConfigValue('loader.enabled');
		this.layoutConfigService.reloadConfigs();

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
	}

	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}

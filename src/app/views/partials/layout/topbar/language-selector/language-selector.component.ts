import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../../../../../core/_base/layout/services/translation.service';

interface LanguageFlag {
	lang: string;
	name: string;
	flag: string;
	active?: boolean;
}

@Component({
	selector: 'kt-language-selector',
	templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit {

	@HostBinding('class') classes = '';

	language: LanguageFlag;
	languages: LanguageFlag[] = [
		{
			lang: 'en',
			name: 'English',
			flag: './assets/media/flags/012-uk.svg'
		},
		{
			lang: 'de',
			name: 'German',
			flag: './assets/media/flags/017-germany.svg'
		}
	];

	constructor(private translationService: TranslationService,
				private router: Router) {
	}

	ngOnInit() {
		this.setSelectedLanguage();
		this.router.events
			.pipe(filter(event => event instanceof NavigationStart))
			.subscribe(() => this.setSelectedLanguage());
	}

	setLanguage(lang) {
		this.languages.forEach((language: LanguageFlag) => {
			if (language.lang === lang) {
				language.active = true;
				this.language = language;
			} else {
				language.active = false;
			}
		});
		this.translationService.setLanguage(lang);
	}

	setSelectedLanguage(): any {
		this.setLanguage(this.translationService.getSelectedLanguage());
	}
}

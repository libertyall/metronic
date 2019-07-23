import { Injectable } from '@angular/core';
import * as objectPath from 'object-path';
import { BehaviorSubject } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LayoutConfigService } from '../../../core/_base/layout';

export interface ClassType {
	header: string[];
	header_mobile: string[];
	header_menu: string[];
	aside_menu: string[];
}

@Injectable()
export class HtmlClassService {

	config: FormlyFieldConfig[];
	classes: ClassType;
	onClassesUpdated$: BehaviorSubject<ClassType>;

	constructor(private layoutConfigService: LayoutConfigService) {
		this.onClassesUpdated$ = new BehaviorSubject(this.classes);
	}

	setConfig(layoutConfig: FormlyFieldConfig[]) {
		this.config = layoutConfig;

		this.classes = {
			header: [],
			header_mobile: [],
			header_menu: [],
			aside_menu: []
		};

		this.initLayout();
		this.initLoader();
		this.initHeader();
		this.initSubheader();
		this.initAside();
		this.initFooter();

		this.onClassesUpdated$.next(this.classes);
	}

	getClasses(path?: string, toString?: boolean): ClassType | string[] | string {
		if (path) {
			const classes = objectPath.get(this.classes, path) || '';
			if (toString && Array.isArray(classes)) {
				return classes.join(' ');
			}
			return classes.toString();
		}
		return this.classes;
	}

	private initLayout() {
		if (this.layoutConfigService.getConfigValue('self.body.class')) {
			document.body.classList.add(this.layoutConfigService.getConfigValue('self.body.class'));
		}
		if (this.layoutConfigService.getConfigValue('self.layout') === 'boxed' && this.layoutConfigService.getConfigValue('self.body.background-image')) {
			document.body.style.backgroundImage = 'url("' + this.layoutConfigService.getConfigValue('self.body.background-image') + '")';
		}
	}

	private initLoader() {
	}

	private initHeader() {
		if (this.layoutConfigService.getConfigValue('header.self.fixed.desktop')) {
			document.body.classList.add('kt-header--fixed');
			objectPath.push(this.classes, 'header', 'kt-header--fixed');
		} else {
			document.body.classList.add('kt-header--static');
		}

		if (this.layoutConfigService.getConfigValue('header.self.fixed.mobile')) {
			document.body.classList.add('kt-header-mobile--fixed');
			objectPath.push(this.classes, 'header_mobile', 'kt-header-mobile--fixed');
		}

		if (this.layoutConfigService.getConfigValue('header.menu.self.layout')) {
			objectPath.push(this.classes, 'header_menu', 'kt-header-menu--layout-' + this.layoutConfigService.getConfigValue('header.menu.self.layout'));
		}
	}

	private initSubheader() {
		if (this.layoutConfigService.getConfigValue('subheader.fixed')) {
			document.body.classList.add('kt-subheader--fixed');
		}

		if (this.layoutConfigService.getConfigValue('subheader.display')) {
			document.body.classList.add('kt-subheader--enabled');
		}

		if (this.layoutConfigService.getConfigValue('subheader.style')) {
			document.body.classList.add('kt-subheader--' + this.layoutConfigService.getConfigValue('subheader.style'));
		}
	}

	private initAside() {
		if (this.layoutConfigService.getConfigValue('aside.self.display') !== true) {
			return;
		}

		document.body.classList.add('kt-aside--enabled');

		if (this.layoutConfigService.getConfigValue('aside.self.skin')) {
			objectPath.push(this.classes, 'aside', 'kt-aside--skin-' + this.layoutConfigService.getConfigValue('aside.self.skin'));
			document.body.classList.add('kt-aside--skin-' + this.layoutConfigService.getConfigValue('aside.self.skin'));
			objectPath.push(this.classes, 'aside_menu', 'kt-aside-menu--skin-' + this.layoutConfigService.getConfigValue('aside.self.skin'));

			document.body.classList.add('kt-aside__brand--skin-' + this.layoutConfigService.getConfigValue('aside.self.skin'));
			objectPath.push(this.classes, 'brand', 'kt-aside__brand--skin-' + this.layoutConfigService.getConfigValue('aside.self.skin'));
		}

		if (this.layoutConfigService.getConfigValue('aside.self.fixed')) {
			document.body.classList.add('kt-aside--fixed');
			objectPath.push(this.classes, 'aside', 'kt-aside--fixed');
		} else {
			document.body.classList.add('kt-aside--static');
		}

		if (this.layoutConfigService.getConfigValue('aside.self.minimize.default')) {
			document.body.classList.add('kt-aside--minimize');
		}

		if (this.layoutConfigService.getConfigValue('aside.self.fixed') !== true && this.layoutConfigService.getConfigValue('aside.menu.dropdown')) {
			objectPath.push(this.classes, 'aside_menu', 'kt-aside-menu--dropdown');
		}
	}

	private initFooter() {
		if (this.layoutConfigService.getConfigValue('footer.self.fixed')) {
			document.body.classList.add('kt-footer--fixed');
		}
	}

}

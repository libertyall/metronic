import { Injectable } from '@angular/core';
import * as objectPath from 'object-path';
import { BehaviorSubject } from 'rxjs';
import { BackendLayoutConfigModel } from '../../../core/_base/layout';

export interface ClassType {
	header: string[];
	header_mobile: string[];
	header_menu: string[];
	aside_menu: string[];
}

@Injectable()
export class HtmlClassService {

	config: {
		backend: BackendLayoutConfigModel,
		frontend: any
	};
	classes: ClassType;
	onClassesUpdated$: BehaviorSubject<ClassType>;

	constructor() {
		this.onClassesUpdated$ = new BehaviorSubject(this.classes);
	}

	/**
	 * Build html element classes from layout config
	 * @param layoutConfig
	 */
	setConfig(layoutConfig: {
		backend: BackendLayoutConfigModel,
		frontend: any
	}) {
		this.config = layoutConfig;

		this.classes = {
			header: [],
			header_mobile: [],
			header_menu: [],
			aside_menu: []
		};

		this.initLayout();
		this.initLoader();
		// this.initAsideSecondary();
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
		if (objectPath.has(this.config, 'backend.self.body.class')) {
			document.body.classList.add(objectPath.get(this.config, 'backend.self.body.class'));
		}
		if (objectPath.get(this.config, 'backend.self.layout') === 'boxed' && objectPath.has(this.config, 'backend.self.body.background-image.selected')) {
			document.body.style.backgroundImage = 'url("' + objectPath.get(this.config, 'backend.self.body.background-image.selected') + '")';
		}
	}

	private initLoader() {
	}

	private initHeader() {
		// Fixed header
		if (objectPath.get(this.config, 'backend.header.self.fixed.desktop.selected')) {
			document.body.classList.add('kt-header--fixed');
			objectPath.push(this.classes, 'header', 'kt-header--fixed');
		} else {
			document.body.classList.add('kt-header--static');
		}

		if (objectPath.get(this.config, 'backend.header.self.fixed.mobile.selected')) {
			document.body.classList.add('kt-header-mobile--fixed');
			objectPath.push(this.classes, 'header_mobile', 'kt-header-mobile--fixed');
		}

		if (objectPath.get(this.config, 'backend.header.menu.self.layout')) {
			objectPath.push(this.classes, 'header_menu', 'kt-header-menu--layout-' + objectPath.get(this.config, 'backend.header.menu.self.layout.selected'));
		}
	}

	private initSubheader() {
		// Fixed content head
		if (objectPath.get(this.config, 'backend.subheader.fixed.selected')) {
			document.body.classList.add('kt-subheader--fixed');
		}

		if (objectPath.get(this.config, 'backend.subheader.display.selected')) {
			document.body.classList.add('kt-subheader--enabled');
		}

		if (objectPath.has(this.config, 'backend.subheader.style.selected')) {
			document.body.classList.add('kt-subheader--' + objectPath.get(this.config, 'backend.subheader.style.selected'));
		}
	}

	private initAside() {
		if (objectPath.get(this.config, 'backend.aside.self.display.selected') !== true) {
			return;
		}

		document.body.classList.add('kt-aside--enabled');

		// Fixed Aside
		if (objectPath.get(this.config, 'backend.aside.self.fixed.selected')) {
			document.body.classList.add('kt-aside--fixed');
			objectPath.push(this.classes, 'aside', 'kt-aside--fixed');
		} else {
			document.body.classList.add('kt-aside--static');
		}

		// Default fixed
		if (objectPath.get(this.config, 'backend.aside.self.minimize.default.selected')) {
			document.body.classList.add('kt-aside--minimize');
		}

		// Menu
		// Dropdown Submenu
		if (objectPath.get(this.config, 'backend.aside.self.fixed.selected') !== true && objectPath.get(this.config, 'backend.aside.menu.dropdown.selected')) {
			objectPath.push(this.classes, 'aside_menu', 'kt-aside-menu--dropdown');
		}
	}

	private initAsideSecondary() {
		if (objectPath.get(this.config, 'backend.aside-secondary.self.display.selected')) {
			document.body.classList.add('kt-aside-secondary--enabled');
		}

		// tslint:disable-next-line:max-line-length
		if (objectPath.get(this.config, 'backend.aside-secondary.self.expanded.selected') === true && objectPath.get(this.config, 'backend.aside-secondary.self.layout.selected') !== 'layout-2') {
			document.body.classList.add('kt-aside-secondary--expanded');
		}

		if (objectPath.get(this.config, 'backend.aside-secondary.self.layout.selected') === 'layout-3') {
			document.body.classList.add('kt-aside-secondary--static');
		}
	}

	private initContent() {
	}

	/**
	 * Init Footer
	 */
	private initFooter() {
		// Fixed header
		if (objectPath.get(this.config, 'backend.footer.self.fixed.selected')) {
			document.body.classList.add('kt-footer--fixed');
		}
	}
}

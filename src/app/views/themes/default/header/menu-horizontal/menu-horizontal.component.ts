import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as objectPath from 'object-path';
import {
	LayoutConfigService, MenuConfigService, MenuHorizontalService, MenuOptions
} from '../../../../../core/_base/layout';
import { OffcanvasOptions } from '../../../../../core/_base/metronic';
import { HtmlClassService } from '../../html-class.service';

@Component({
	selector: 'kt-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	styleUrls: ['./menu-horizontal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHorizontalComponent implements OnInit, AfterViewInit {

	currentRouteUrl: any = '';

	rootArrowEnabled: boolean;

	menuOptions: MenuOptions = {
		submenu: {
			desktop: 'dropdown',
			tablet: 'accordion',
			mobile: 'accordion'
		},
		accordion: {
			slideSpeed: 200, // accordion toggle slide speed in milliseconds
			expandAll: false // allow having multiple expanded accordions in the menu
		}
	};

	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-header-menu-wrapper',
		closeBy: 'kt_header_menu_mobile_close_btn',
		toggleBy: {
			target: 'kt_header_mobile_toggler',
			state: 'kt-header-mobile__toolbar-toggler--active'
		}
	};


	constructor(
		private el: ElementRef,
		public htmlClassService: HtmlClassService,
		public menuHorService: MenuHorizontalService,
		private menuConfigService: MenuConfigService,
		private layoutConfigService: LayoutConfigService,
		private router: Router,
		private render: Renderer2
	) {
	}

	ngAfterViewInit(): void {
	}


	ngOnInit(): void {
		this.rootArrowEnabled = this.layoutConfigService.getConfig('backend.header.menu.self.root-arrow');

		this.currentRouteUrl = this.router.url;
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
			});
	}


	mouseLeave(event: MouseEvent) {
		this.render.removeClass(event.target, 'kt-menu__item--hover');
	}


	getItemCssClasses(item) {
		let classes = 'kt-menu__item';

		if (objectPath.get(item, 'submenu')) {
			classes += ' kt-menu__item--submenu';
		}

		if (objectPath.get(item, 'resizer')) {
			classes += ' kt-menu__item--resize';
		}

		const menuType = objectPath.get(item, 'submenu.type') || 'classic';
		if ((objectPath.get(item, 'root') && menuType === 'classic')
			|| parseInt(objectPath.get(item, 'submenu.width'), 10) > 0) {
			classes += ' kt-menu__item--rel';
		}

		const customClass = objectPath.get(item, 'custom-class');
		if (customClass) {
			classes += ' ' + customClass;
		}

		if (objectPath.get(item, 'icon-only')) {
			classes += ' kt-menu__item--icon-only';
		}

		if (this.isMenuItemIsActive(item)) {
			classes += ' kt-menu__item--active kt-menu__item--here';
		}

		return classes;
	}

	getItemAttrSubmenuToggle(item) {
		let toggle = 'hover';
		if (objectPath.get(item, 'toggle') === 'click') {
			toggle = 'click';
		} else if (objectPath.get(item, 'submenu.type') === 'tabs') {
			toggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return toggle;
	}

	getItemMenuSubmenuClass(item) {
		let classes = '';

		const alignment = objectPath.get(item, 'alignment') || 'right';

		if (alignment) {
			classes += ' kt-menu__submenu--' + alignment;
		}

		const type = objectPath.get(item, 'type') || 'classic';
		if (type === 'classic') {
			classes += ' kt-menu__submenu--classic';
		}
		if (type === 'tabs') {
			classes += ' kt-menu__submenu--tabs';
		}
		if (type === 'mega') {
			if (objectPath.get(item, 'width')) {
				classes += ' kt-menu__submenu--fixed';
			}
		}

		if (objectPath.get(item, 'pull')) {
			classes += ' kt-menu__submenu--pull';
		}

		return classes;
	}


	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return this.currentRouteUrl.indexOf(item.page) !== -1;
	}

	isMenuRootItemIsActive(item): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (item.submenu) {
			for (const subItem of item.submenu) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		return false;
	}
}

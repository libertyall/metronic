import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as objectPath from 'object-path';
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuHorizontalService {

	menuList$: BehaviorSubject<any> = new BehaviorSubject({});

	constructor(private menuConfigService: MenuConfigService) {
		this.loadMenu();
	}

	loadMenu() {
		const menuItems = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
		this.menuList$.next(menuItems);
	}
}

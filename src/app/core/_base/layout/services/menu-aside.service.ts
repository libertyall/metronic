import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as objectPath from 'object-path';
import {MenuConfigService} from './menu-config.service';

@Injectable()
export class MenuAsideService {

	classes: string;
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(private menuConfigService: MenuConfigService) {
		this.loadMenu();
	}

	loadMenu() {
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
		this.menuList$.next(menuItems);
	}
}

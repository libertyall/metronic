import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import * as objectPath from 'object-path';
import {Permission} from '../../../../core/auth/_interfaces/permission.interface';
import {LayoutConfigService, MenuConfigService, PageConfigService} from '../../../../core/_base/layout';
import {HtmlClassService} from '../html-class.service';
import {AppState} from '../../../../core/reducers';
import {select, Store} from '@ngrx/store';
import {NgxPermissionsService} from 'ngx-permissions';
import {MenuConfig} from '../../../../core/_config/default/menu.config';
import {PageConfig} from '../../../../core/_config/default/page.config';

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {

	selfLayout: string;
	asideDisplay: boolean;
	// asideSecondary: boolean;
	subheaderDisplay: boolean;

	private unsubscribe: Subscription[] = [];
	private currentUserPermissions$: Observable<Permission[]>;

	constructor(private layoutConfigService: LayoutConfigService,
				private menuConfigService: MenuConfigService,
				private pageConfigService: PageConfigService,
				private htmlClassService: HtmlClassService,
				private store: Store<AppState>,
				private permissionsService: NgxPermissionsService) {

		// this.store.pipe(select(currentUser)).pipe(t => console.log(t));

		// this.loadRolesWithPermissions();

		this.menuConfigService.loadConfigs(new MenuConfig().configs);
		this.pageConfigService.loadConfigs(new PageConfig().configs);

		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

		const layoutSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(layoutSubscription);
	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();

		this.selfLayout = objectPath.get(config, 'backend.self.layout.selected');
		this.asideDisplay = objectPath.get(config, 'backend.aside.self.display.selected');
		this.subheaderDisplay = objectPath.get(config, 'backend.subheader.display.selected');

		const layoutConfigSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'backend.self.layout.selected');
			});
		});
		this.unsubscribe.push(layoutConfigSubscription);
	}

	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	/*
	loadRolesWithPermissions() {
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		const subscr = this.currentUserPermissions$.subscribe(res => {
			if (!res || res.length === 0) {
				return;
			}

			this.permissionsService.flushPermissions();
			res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
		});
		this.unsubscribe.push(subscr);
	} */
}

import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PermissionClass} from '../../../../core/auth/_interfaces/permission.interface';
import {LayoutConfigService, MenuConfigService, PageConfigService} from '../../../../core/_base/layout';
import {HtmlClassService} from '../html-class.service';
import {select, Store} from '@ngrx/store';
import {NgxPermissionsService} from 'ngx-permissions';
import {MenuConfig} from '../../../../core/_config/default/menu.config';
import {PageConfig} from '../../../../core/_config/default/page.config';
import {currentUserPermissions} from '../../../../core/auth/_selectors/auth.selectors';
import {AppState} from '../../../../app.state';
import {backendMessage} from "../../../../modules/settings/_selectors/settings.selectors";
import {LayoutUtilsService} from "../../../../core/_base/crud";
import {unsetBackendMessage} from "../../../../modules/settings/_actions/settings.actions";

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {

	selfLayout: string;
	asideDisplay: boolean;
	subheaderDisplay: boolean;
	desktopHeaderDisplay: boolean;
	fitTop: boolean;
	fluid: boolean;


	private unsubscribe: Subscription[] = [];
	private currentUserPermissions$: Observable<PermissionClass[]>;

	constructor(private layoutConfigService: LayoutConfigService,
				private menuConfigService: MenuConfigService,
				private layoutUtilsService: LayoutUtilsService,
				private pageConfigService: PageConfigService,
				private htmlClassService: HtmlClassService,
				private store: Store<AppState>,
				private permissionsService: NgxPermissionsService) {

		// this.loadRolesWithPermissions();

		this.menuConfigService.loadConfigs(new MenuConfig().configs);
		this.pageConfigService.loadConfigs(new PageConfig().configs);
		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

		const layoutSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(layoutSubscription);

		const backendMsgSubscription = this.store.select(backendMessage).subscribe((message) => {
			// console.log(message);
			if (message) {
				// this.store.dispatch(unsetBackendMessage());
				return this.layoutUtilsService.showActionNotification(message.code, message.color);
			}
		});
		this.unsubscribe.push(backendMsgSubscription);
	}

	ngOnInit(): void {
		this.initLayout();

		const layoutConfigSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(() => {
			setTimeout(() => this.initLayout());
		});
		this.unsubscribe.push(layoutConfigSubscription);
	}

	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	initLayout(): void {
		this.selfLayout = this.layoutConfigService.getConfigValue('self.layout');
		this.asideDisplay = this.layoutConfigService.getConfigValue('aside.self.display');
		this.subheaderDisplay = this.layoutConfigService.getConfigValue('subheader.display');
		this.desktopHeaderDisplay = this.layoutConfigService.getConfigValue('header.self.fixed.desktop');
		this.fitTop = this.layoutConfigService.getConfigValue('content.fit-top');
		this.fluid = this.layoutConfigService.getConfigValue('content.width');
	}

	loadRolesWithPermissions() {
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		const subscription = this.currentUserPermissions$.subscribe(res => {
			if (!res || res.length === 0) {
				return;
			}

			this.permissionsService.flushPermissions();
			res.forEach((pm: PermissionClass) => this.permissionsService.addPermission(pm.name));
		});
		this.unsubscribe.push(subscription);
	}

}

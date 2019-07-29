import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {InlineSVGModule} from 'ng-inline-svg';
import {CoreModule} from '../../../core/core.module';
import {HeaderComponent} from './header/header.component';
import {AsideLeftComponent} from './aside/aside-left.component';
import {FooterComponent} from './footer/footer.component';
import {SubheaderComponent} from './subheader/subheader.component';
import {BrandComponent} from './header/brand/brand.component';
import {TopbarComponent} from './header/topbar/topbar.component';
import {MenuHorizontalComponent} from './header/menu-horizontal/menu-horizontal.component';
import {PartialsModule} from '../../partials/partials.module';
import {BaseComponent} from './base/base.component';
import {PagesRoutingModule} from './pages-routing.module';
import {HtmlClassService} from './html-class.service';
import {HeaderMobileComponent} from './header/header-mobile/header-mobile.component';
import {ErrorPageComponent} from './content/error-page/error-page.component';
import {rolesReducer} from '../../../core/auth/_reducers/role.reducers';
import {RoleEffects} from '../../../core/auth/_effects/role.effects';
import {PermissionEffects} from '../../../core/auth/_effects/permission.effects';
import {permissionsReducer} from '../../../core/auth/_reducers/permission.reducers';
import {NgxPermissionsModule} from 'ngx-permissions';
import {
	SearchDropdownComponent, StickyToolbarComponent,
	Subheader1Component,
	Subheader2Component,
	Subheader3Component
} from '../../partials/layout';
import {Subheader4Component} from '../../partials/layout/subheader/subheader4/subheader4.component';
import {Subheader5Component} from '../../partials/layout/subheader/subheader5/subheader5.component';
import {
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService, SubheaderService
} from "../../../core/_base/layout";
import {LayoutUtilsService} from "../../../core/_base/crud";
import {AuthGuard} from "../../../core/auth/_guards/auth.guard";

@NgModule({
	declarations: [
		BaseComponent,
		FooterComponent,
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,
		SubheaderComponent,
		TopbarComponent,
		AsideLeftComponent,
		MenuHorizontalComponent,
		ErrorPageComponent,
		StickyToolbarComponent,
	],
	exports: [
		BaseComponent,
		FooterComponent,
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,
		SubheaderComponent,
		TopbarComponent,
		StickyToolbarComponent,
		AsideLeftComponent,
		MenuHorizontalComponent,
		ErrorPageComponent
	],
	providers: [
		AuthGuard,
		HtmlClassService,
		MenuConfigService,
		PageConfigService,
		MenuAsideService,
		LayoutRefService,
		LayoutUtilsService,
		MenuHorizontalService,
		SubheaderService
	],
	imports: [
		CommonModule,
		// NgxPermissionsModule.forChild(),
		// StoreModule.forFeature('roles', rolesReducer),
		// StoreModule.forFeature('permissions', permissionsReducer),
		// EffectsModule.forFeature([PermissionEffects, RoleEffects]),
		PagesRoutingModule,
		CoreModule,
		// start
		NgbDropdownModule,
		// PagesModule,
		PartialsModule,
		InlineSVGModule,
		PerfectScrollbarModule,
		NgbProgressbarModule,
		NgbTooltipModule,
		// MatProgressBarModule,
		// MatTabsModule,
		// MatButtonModule,
		// MatTooltipModule,
		TranslateModule.forChild()
		// LoadingBarModule,
		// NgxDaterangepickerMd,
	]
})
export class ThemeModule {
}

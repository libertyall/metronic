import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';
import { environment } from '../environments/environment';
import 'hammerjs';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PartialsModule } from './views/partials/partials.module';
import { DataTableService } from './core/_base/metronic';
import {
	KtDialogService, LayoutConfigService, LayoutRefService, MenuAsideService, MenuConfigService, MenuHorizontalService,
	PageConfigService, SplashScreenService, SubheaderService
} from './core/_base/layout';
import { AuthModule } from './views/pages/auth/auth.module';
import { HttpUtilsService, LayoutUtilsService, TypesUtilsService } from './core/_base/crud';
import { LayoutConfig } from './core/_config/default/layout.config';
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from 'ngx-highlightjs';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './core/auth/_services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UnAuthGuard } from './core/auth/_guards/unauth.guard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './core/reducers';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ApplicationService } from './shared/services/application.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

export function hljsLanguages(): HighlightLanguage[] {
	return [
		{ name: 'typescript', func: typescript },
		{ name: 'scss', func: scss },
		{ name: 'xml', func: xml },
		{ name: 'json', func: json }
	];
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgxPermissionsModule.forRoot(),
		PartialsModule,
		CoreModule,
		OverlayModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule.enablePersistence(),
		AngularFireAuthModule,
		// NgbModule,
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot()
	],
	exports: [],
	providers: [
		ApplicationService,
		AuthService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		UnAuthGuard,
		PageConfigService,
		KtDialogService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: GestureConfig
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService],
			multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: { languages: hljsLanguages }
		},
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,
		{
			provide:
			FirestoreSettingsToken,
			useValue: {}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

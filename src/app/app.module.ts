import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GestureConfig, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {InlineSVGModule} from 'ng-inline-svg';
import {environment} from '../environments/environment';
import 'hammerjs';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {PartialsModule} from './views/partials/partials.module';
import {DataTableService} from './core/_base/metronic';
import {
	KtDialogService,
	LayoutConfigService,
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService,
	SplashScreenService,
	SubheaderService
} from './core/_base/layout';
import {LayoutUtilsService, TypesUtilsService} from './core/_base/crud';
import {HIGHLIGHT_OPTIONS, HighlightLanguage} from 'ngx-highlightjs';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {AuthService} from './core/auth/_services';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UnAuthGuard} from './core/auth/_guards/unauth.guard';
import {NgxPermissionsModule} from 'ngx-permissions';
import {GravatarService} from './core/auth/_services/gravatar.service';
import {ApplicationService} from './modules/application/services/application.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UserService} from './core/auth/_services/user.service';
import {AuthModule} from './views/pages/auth/auth.module';
import { StateModule } from './store/state.module';
import {EntityDataModule} from '@ngrx/data';
import {entityConfig} from './core/_config/default/entity-metadata';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

/* export function storageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return storageSync<AppState>({
		features: [
			// { stateKey: 'router', storageForFeature: window.sessionStorage },
			{ stateKey: 'auth' }
		],
		storage: window.localStorage
	})(reducer);
} */

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300
};

export function initializeConfig(layoutConfigService: LayoutConfigService, applicationService: ApplicationService) {
	return () => {
		applicationService.getConfiguration(layoutConfigService).subscribe(t => console.log('loaded cfg', t));
		return applicationService.getConfiguration(layoutConfigService).toPromise();
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
		MatSnackBarModule,
		// PartialsModule,
		// CoreModule,
		// OverlayModule,
		AuthModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule.enablePersistence(),
		AngularFireAuthModule,
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		// InlineSVGModule.forRoot(),
		environment.production ? [] : StoreDevtoolsModule.instrument({
			maxAge: 40
		}),
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StateModule.forRoot(),
		EntityDataModule.forRoot(entityConfig)
	],
	exports: [
		MatSnackBarModule
	],
	providers: [
		ApplicationService,
		// AuthService,
		UserService,
		// GravatarService,
		LayoutConfigService,
		// LayoutRefService,
		// MenuConfigService,
		// UnAuthGuard,
		// PageConfigService,
		// KtDialogService,
		// DataTableService,
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
			useFactory: initializeConfig,
			deps: [LayoutConfigService, ApplicationService],
			multi: true
		}/*,
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: { languages: hljsLanguages }
		}*/,
		// SubheaderService,
		// MenuHorizontalService,
		// MenuAsideService,
		// TypesUtilsService,
		// LayoutUtilsService,
		{
			provide: FirestoreSettingsToken,
			useValue: {}
		}/*,
		{
			provide: DefaultDataServiceFactory,
			useClass: FirestoreDataServiceFactory
		}/* ,
		{
			provide: EntityCacheDataService,
			useClass: FirestoreCacheDataService
		},
		{
			provide: PersistenceResultHandler,
			useClass: FirestorePersistenceResultHandler
		}*/
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { environment } from '../environments/environment';
import 'hammerjs';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutConfigService, SplashScreenService } from './core/_base/layout';
import { HighlightLanguage } from 'ngx-highlightjs';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ApplicationService } from './modules/application/services/application.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserService } from './core/auth/_services/user.service';
import { AuthModule } from './views/pages/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { appMetaReducers, appReducer } from './app.state';
import { RouterEffects } from './views/state/router.effects';
import { AuthEffects } from './core/auth/_effects/auth.effects';

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
		{name: 'typescript', func: typescript},
		{name: 'scss', func: scss},
		{name: 'xml', func: xml},
		{name: 'json', func: json}
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
		StoreModule.forRoot(appReducer, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			},
			metaReducers: appMetaReducers
		}),
		EffectsModule.forRoot([RouterEffects, AuthEffects]),
		StoreDevtoolsModule.instrument({logOnly: environment.production}),
		// StateModule,
		// EntityDataModule.forRoot(entityConfig),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal
		})
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
		}/* ,
		{
			provide: EntityCacheDataService,
			useClass: FirestoreCacheDataService
		}*/
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

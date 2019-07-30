import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	GestureConfig, MatDialog, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule
} from '@angular/material';
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
import { UserService } from './core/auth/_services/user.service';
import { AuthModule } from './views/pages/auth/auth.module';
import { ApplicationService } from './modules/settings/_services/application.service';
import { PartialsModule } from './views/partials/partials.module';
import { AppStoreModule } from './store/app-store.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/auth/_effects/auth.effects';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import {MDBBootstrapModulePro} from "ng-uikit-pro-standard";
import {SettingsEffects} from "./modules/settings/_effects/settings.effects";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300
};

export function initializeConfig(layoutConfigService: LayoutConfigService, applicationService: ApplicationService) {
	return () => {
		return applicationService.getConfiguration(layoutConfigService).toPromise();
	};
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		AppStoreModule,
		HttpClientModule,
		NgxPermissionsModule.forRoot(),
		MatSnackBarModule,
		MatDialogModule,
		MDBBootstrapModulePro.forRoot(),
		PartialsModule,
		// CoreModule,
		// OverlayModule,
		AuthModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule.enablePersistence(),
		AngularFireAuthModule,
		AngularFireAuthGuardModule,
		TranslateModule.forRoot(),
		MatProgressSpinnerModule
		// InlineSVGModule.forRoot(),
	],
	exports: [
		MatSnackBarModule
	],
	providers: [
		ApplicationService,
		MatDialog,
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
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

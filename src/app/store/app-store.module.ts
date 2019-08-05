import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { appMetaReducers, appReducer } from './app.state';
import { RouterEffects } from '../views/state/router.effects';
import { AuthEffects } from '../core/auth/_effects/auth.effects';
import { SettingsEffects } from '../modules/settings/_effects/settings.effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { FirestoreService } from '../shared/services/firestore.service';

@NgModule({
	imports: [
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		StoreModule.forRoot(appReducer, {
			runtimeChecks: {
				/* strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true */
			},
			metaReducers: appMetaReducers
		}),
		EffectsModule.forRoot([RouterEffects, AuthEffects, SettingsEffects]),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal
		})
	],
	providers: [
		FirestoreService
	]
})
export class AppStoreModule {
}

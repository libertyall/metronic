import { NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { appMetaReducers, appReducer } from './app.state';
import { RouterEffects } from '../views/state/router.effects';
import { AuthEffects } from '../core/auth/_effects/auth.effects';
import { SettingsEffects } from '../modules/settings/_effects/settings.effects';
import { EntityDataModule, EntityDataService, EntityServices } from '@ngrx/data';
import { entityConfig } from './entity/entity-metadata';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EntityStoreModule } from './entity/entity-store.module';
import { AppEntityServices } from './entity/app-entity-services';
import { AppSelectors } from '../modules/settings/_selectors/app.selectors';
// import { storeFreeze } from 'ngrx-store-freeze';

export const metaReducers: MetaReducer<any>[] = environment.production
	? []
	: []; // [storeFreeze];

@NgModule({
	imports: [
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		StoreModule.forRoot(appReducer, {
			runtimeChecks: {
				/*strictStateImmutability: true,
				 strictActionImmutability: true,
				 strictStateSerializability: true,
				 strictActionSerializability: true */
			},
			metaReducers: appMetaReducers
		}),
		EffectsModule.forRoot([RouterEffects, AuthEffects, SettingsEffects]),
		// EntityDataModule.forRoot(entityConfig),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),
		// StateModule,
		EntityDataModule.forRoot(entityConfig),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal
		}),
		// EntityStoreModule,
	],
	providers: [
		EntityDataService
		/* AppEntityServices,
		{ provide: EntityServices, useExisting: AppEntityServices },
		AppSelectors */
	]
})
export class AppStoreModule {
}

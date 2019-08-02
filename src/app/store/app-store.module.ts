import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {appMetaReducers, appReducer} from './app.state';
import {RouterEffects} from '../views/state/router.effects';
import {AuthEffects} from '../core/auth/_effects/auth.effects';
import {SettingsEffects} from '../modules/settings/_effects/settings.effects';
import {EntityDataModule, EntityDataService} from '@ngrx/data';
import {entityConfig} from './entity/entity-metadata';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CategoryDataService} from "../modules/category/_services/category-data.service";

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
		StoreDevtoolsModule.instrument({logOnly: environment.production}),
		EntityDataModule.forRoot(entityConfig),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal
		})
	],
	providers: [
		CategoryDataService
	]
})
export class AppStoreModule {
	constructor(entityDataService: EntityDataService,
				categoryDataService: CategoryDataService) {
		entityDataService.registerServices({
			Category: categoryDataService
		});
	}
}

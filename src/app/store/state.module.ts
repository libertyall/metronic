import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {appMetaReducers, appReducer} from '../app.state';
import {EntityEffects} from '@briebug/ngrx-auto-entity';
import {environment} from '../../environments/environment';
import {RouterEffects} from '../views/state/router.effects';
import {NgrxDataToastService} from "./ngrx-data-toast.service";
import {EntityDataModule, EntityDataService} from "@ngrx/data";
import {entityConfig} from "../core/_config/default/entity-metadata";
import {CategoryDataService} from "../modules/category/category.data.service";

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(appReducer, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			},
			metaReducers: appMetaReducers
		}),
		EffectsModule.forRoot([RouterEffects]),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal
		})
	],
	providers: [
		CategoryDataService
	]
})
export class StateModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: StateModule
		};
	}

	constructor(
		entityDataService: EntityDataService,
		categoryDataService: CategoryDataService,
		toastService: NgrxDataToastService,
		@Optional()
		@SkipSelf()
			parentModule: StateModule
	) {
		entityDataService.registerService('Category', categoryDataService);
		if (parentModule) {
			throw new Error('StateModule is already loaded. Import it in the AppModule only');
		}
	}
}

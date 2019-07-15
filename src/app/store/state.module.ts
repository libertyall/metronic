import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer, appMetaReducers } from '../app.state';
import { EntityEffects } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';
import { CustomRouterStateSerializer } from '../shared/utils/utils';
import { RouterEffects } from '../views/state/router.effects';

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
		EffectsModule.forRoot([EntityEffects, RouterEffects]),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),
		/* StoreRouterConnectingModule.forRoot({
			stateKey: 'router'
		}) */
	]
})
export class StateModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: StateModule,
			providers: [
				{
					provide: RouterStateSerializer,
					useClass: CustomRouterStateSerializer
				}
			]
		};
	}

	constructor(
		@Optional()
		@SkipSelf()
			parentModule: StateModule
	) {
		if (parentModule) {
			throw new Error('StateModule is already loaded. Import it in the AppModule only');
		}
	}
}

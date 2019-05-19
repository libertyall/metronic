import { NgModule } from '@angular/core';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceFactory, PersistenceResultHandler } from 'ngrx-data';
import { FirestorePersistenceResultHandler } from './firestore/firestore-persistence-result-handler.service';
import { FirestoreDataServiceFactory } from './firestore/firestore-entity-collection-data.service';
import { AppState } from '../core/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../core/auth/_reducers/auth.reducer';

/* export function storageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return storageSync<AppState>({
		features: [
			// { stateKey: 'router', storageForFeature: window.sessionStorage },
			{ stateKey: 'auth' }
		],
		storage: window.localStorage
	})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer]; */

@NgModule({
	declarations: [],
	imports: [
		EffectsModule.forRoot([]),
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		StoreModule.forRoot(reducers), // , { metaReducers }
		StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
	],
	providers: [
		{
			provide: DefaultDataServiceFactory,
			useClass: FirestoreDataServiceFactory
		},
		{
			provide: PersistenceResultHandler,
			useClass: FirestorePersistenceResultHandler
		}
	]
})
export class AppStoreModule {

	constructor() { // toastService: NgrxDataToastService
	}

}

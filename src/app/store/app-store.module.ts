import { NgModule } from '@angular/core';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceFactory, PersistenceResultHandler } from 'ngrx-data';
// import { entityConfig } from './entity-metadata';
import { FirestorePersistenceResultHandler } from './firestore/firestore-persistence-result-handler.service';
import { FirestoreDataServiceFactory } from './firestore/firestore-entity-collection-data.service';
import { AppState, reducers } from '../core/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';


export function storageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return storageSync<AppState>({
		features: [
			// save only router state to sessionStorage
			{ stateKey: 'router', storageForFeature: window.sessionStorage },

			// exclude key 'success' inside 'auth' and all keys 'loading' inside 'feature1'
			{ stateKey: 'auth' }
		],
		// defaults to localStorage
		storage: window.localStorage
	})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];

@NgModule({
	declarations: [],
	imports: [
		EffectsModule.forRoot([]),
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		// NgrxDataModule.forRoot(entityConfig),
		StoreModule.forRoot(reducers, { metaReducers }),
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

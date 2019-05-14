import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceFactory, PersistenceResultHandler } from 'ngrx-data';
// import { entityConfig } from './entity-metadata';
import { FirestorePersistenceResultHandler } from './firestore/firestore-persistence-result-handler.service';
import { FirestoreDataServiceFactory } from './firestore/firestore-entity-collection-data.service';
import { metaReducers, reducers } from '../core/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

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

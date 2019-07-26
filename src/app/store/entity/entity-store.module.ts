import { NgModule } from '@angular/core';

import { EntityDataModule, EntityDataService, EntityServices } from '@ngrx/data';

import { AppEntityServices } from './app-entity-services';

import { entityMetadata } from './entity-metadata';


@NgModule({
	imports: [
		EntityDataModule.forRoot({
			entityMetadata
		})
	],
	providers: [
		AppEntityServices,
		{ provide: EntityServices, useExisting: AppEntityServices },
		// { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
		// { provide: Logger, useClass:  },
		// { provide: Pluralizer, useClass: AppPluralizer },
		EntityDataService
	]
})
export class EntityStoreModule {
}

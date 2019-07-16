import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EntityDataModule, EntityServices} from '@ngrx/data';
import {CategoryDataService} from '../modules/category/category.data.service';
import {entityConfig} from '../core/_config/default/entity-metadata';

@NgModule({
	imports: [
		CommonModule,
		EntityDataModule.forRoot(entityConfig)
	]
})
export class StateModule {
	constructor(entityServices: EntityServices,
				categoryDataService: CategoryDataService) {
		entityServices.registerEntityCollectionService(categoryDataService);
	}
}

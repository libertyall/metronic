import { Injectable } from '@angular/core';
import {EntityServicesBase, EntityServicesElements} from "@ngrx/data";
// import { CategoryDataService } from '../../modules/category/_services/category-data.service';

@Injectable()
export class AppEntityServices extends EntityServicesBase {

	/* constructor(entityServicesElements: EntityServicesElements,
			   public readonly categoryService: CategoryDataService
	) {
		super(entityServicesElements);
		// this.registerEntityCollectionServices([categoryService]);
	} */
}

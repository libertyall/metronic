import { Injectable } from '@angular/core';
import {CategoryService} from "../modules/category/_services/category.service";
import {EntityServicesBase, EntityServicesElements} from "@ngrx/data";

@Injectable()
export class AppEntityServices extends EntityServicesBase {

	constructor(entityServicesElements: EntityServicesElements,
			   public readonly categoryService: CategoryService
	) {
		super(entityServicesElements);
		this.registerEntityCollectionServices([categoryService]);
	}

}

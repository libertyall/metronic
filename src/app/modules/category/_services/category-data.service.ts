import { Injectable } from '@angular/core';
import {Category} from "../_model/category.model";
import {FirestoreDataService} from "../../../store/entity/firestore-data.service";
import {FirestoreDataConfig} from "../../../store/entity/firestore-data.config";

@Injectable()
@FirestoreDataConfig({
	collectionName: 'categories'
})
export class CategoryDataService extends FirestoreDataService<Category> {
}

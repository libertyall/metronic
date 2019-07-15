import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DefaultDataService, HttpUrlGenerator, Logger} from '@ngrx/data';

import {Observable} from 'rxjs';
import {CategoryModel} from './model/category.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class CategoryDataService extends DefaultDataService<CategoryModel> {

	constructor(private afs: AngularFirestore, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
		super('CategoryModel', http, httpUrlGenerator);
		logger.log('Created custom CategoryModel EntityDataService');
	}

	getAll(): Observable<CategoryModel[]> {
		return this.afs.collection<CategoryModel>('categories').valueChanges();
	}

	/* getById(id: string | number): Observable<CategoryModel> {
		return super.getById(id).pipe(map(category => this.mapCategoryModel(category)));
	}

	getWithQuery(params: string | QueryParams): Observable<CategoryModel[]> {
		return super.getWithQuery(params).pipe(map(categories => categories.map(category => this.mapCategoryModel(category))));
	}

	private mapCategoryModel(category: CategoryModel): CategoryModel {
		return { ...category };
	} */
}

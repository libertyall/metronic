import { Injectable } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { from, Observable, of } from 'rxjs';
import {flatMap, tap} from 'rxjs/operators';
import {FirestoreAdapterService} from "./firestore-adapter.service";
import {Update} from "@ngrx/entity";
import OrderByDirection = firebase.firestore.OrderByDirection;
import * as _ from 'lodash';

export interface EntityBaseModel {
	id?: number | string;
}

@Injectable()
export class FirestoreDataService<T extends EntityBaseModel> implements EntityCollectionDataService<T> {

	public name;
	protected collection;

	public entities$: Observable<T[]>;

	constructor(private readonly db: FirestoreAdapterService) {
		this.entities$ = this.db.col<T>(this.collection).valueChanges();
	}

	config(config: { collectionName: string }): FirestoreDataService<T> {
		this.collection = config.collectionName;
		this.name = `[${config.collectionName.toUpperCase()}] Firestore Data Service`;
		return this;
	}

	add(entity: T): Observable<T> {
		const docPath = this.docPath(entity);

		return from(this.db.set<T>(docPath, entity)).pipe(
			flatMap(() => this.db.doc$<T>(docPath)),
			// catchError(error => console.log(error))
		);
	}

	delete(id: number | string): Observable<null> {
		const docPath = this.docPath(id);
		return from(this.db.delete<T>(docPath)).pipe(
			flatMap(() => of(null))
		);
	}

	getAll(): Observable<T[]> {
		const docPath = this.docPath();
		return this.db.colWithIds$<T>(docPath);
	}

	getById(id: any): Observable<T> {
		const docPath = this.docPath(id);
		return this.db.doc$<T>(docPath);
	}

	getWithQuery(queryParams: QueryParams): Observable<T[]> {
		const params = _.merge({
			direction: 'desc',
			active: 'title',
			pageIndex: 0,
			pageSize: 100
		}, queryParams);
		console.log(params);
		console.log(Number(params.pageIndex) * Number(params.pageSize));
		const docPath = this.docPath();
		return this.db.col<T>(docPath , ref =>
			ref.where('title', '==', 123)
				.orderBy(params.active, <OrderByDirection>params.direction)
				.startAfter(Number(params.pageIndex) * Number(params.pageSize))
				.limit(Number(params.pageSize))
		).valueChanges();
	}

	update(update: Update<T>): Observable<T> {
		const docPath = this.docPath(update);
		return from(this.db.update<T>(docPath, update.changes)).pipe(
			flatMap(() => this.db.doc$<T>(docPath))
		);
	}

	upsert(entity: T): Observable<T> {
		const docPath = this.docPath(entity);
		return from(this.db.upsert<T>(docPath, entity)).pipe(
			flatMap(() => this.db.doc$<T>(docPath))
		);
	}

	private docPath(param?: T | Update<T> | number | string | undefined): string {
		let path: string;
		switch (typeof param) {
			case 'number':
			case 'string':
				path = `${this.collection}/${param}`;
				break;
			case 'undefined':
				path = this.collection;
				break;
			default:
				path = param['id'] ? `${this.collection}/${param['id']}` : this.collection;
		}
		return path;
	}
}

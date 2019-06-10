import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryType } from '../../interfaces/category-type.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { QueryParamsModel } from '../../../core/_base/crud';
import { ICategory } from '../../interfaces/category.interface';

@Injectable()
export class CategoryTypeService {

	private collectionRef: AngularFirestoreCollection<ICategoryType>;
	private path = `category-types`;

	public categoryTypes$: Observable<ICategoryType[]>;

	constructor(private afs: AngularFirestore) {
		this.collectionRef = this.afs.collection<ICategoryType>(this.path);
		this.categoryTypes$ = this.collectionRef.valueChanges();
	}

	getCategoryTypes(page: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.categoryTypes$.pipe(map(categoryTypes => {
			const totalItems = categoryTypes.length;
			const filteredItems = filter && filter.title !== '' ? categoryTypes.filter(categoryType => {
				return categoryType.title.indexOf(filter.title) > -1;
			}) : categoryTypes;
			const sortedItems = this.sortData(filteredItems, sortField, sortOrder);
			const paginatedItems = sortedItems.splice(pageNumber * pageSize, pageSize);
			return {
				items: paginatedItems,
				totalCount: totalItems,
				errorMessage: ''
			};
		}), take(1));
	}

	sortData(items, sortField = 'title', sortOrder = 'asc') {
		return items.sort((a, b) => {
			return (a[sortField] < b[sortField] ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
		});
	}

	createCategoryType(categoryType: ICategoryType): Promise<ICategoryType> {
		if (!categoryType.id) {
			categoryType.id = this.afs.createId();
		}
		return this.afs.collection(this.path).doc(categoryType.id).set(categoryType).then(() => {
			return categoryType;
		});
	}

	removeCategoryType(categoryTypeId: string): Promise<void> {
		return this.afs.collection(this.path).doc(categoryTypeId).delete();
	}

	updateCategoryType(categoryType: ICategoryType): Promise<any> {
		return this.afs.collection(this.path).doc(categoryType.id).update(categoryType);
	}

	getCategoryTypeById(categoryTypeId: string): Observable<ICategoryType> {
		return this.afs.doc<ICategoryType>(this.path + '/' + categoryTypeId).valueChanges();
	}

	getCategoryTypeByLink(categoryTypeLink: string): Observable<ICategoryType> {
		return this.afs.collection<ICategoryType>(this.path, ref => ref.where('link', '==', categoryTypeLink)).valueChanges().pipe(
			map((categoryTypes: ICategoryType[]) => {
				return categoryTypes.find((categoryType: ICategoryType) => {
					return categoryType.link === categoryTypeLink;
				});
			})
		);
	}

}

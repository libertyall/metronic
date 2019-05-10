import {Injectable} from '@angular/core';
import {ICategory} from '../../interfaces/category.interface';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {CategoryTypeService} from '../category-type/category-type.service';
import {Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../../core/auth/_services/auth.service';
import {QueryParamsModel} from '../../../core/_base/crud';

@Injectable()
export class CategoryService {

	private collectionRef: AngularFirestoreCollection<ICategory>;
	private path = `categories`;

	categories$: Observable<ICategory[]>;

	constructor(private afs: AngularFirestore,
				private authService: AuthService,
				private categoryTypeService: CategoryTypeService) {
		this.collectionRef = this.afs.collection<ICategory>(this.path);
		this.categories$ = this.collectionRef.valueChanges();
	}

	getCategories(page: QueryParamsModel): Observable<any> {
		console.log(page);
		const {filter, pageNumber, pageSize, sortField, sortOrder} = page;
		return this.categories$.pipe(map(categories => {
			console.log(categories.length);
			// Filter by search input
			const filteredItems = filter && filter.title !== '' ? categories.filter(category => {
				return category.title.indexOf(filter.title) > -1;
			}) : categories;
			console.log(pageNumber * pageSize, pageSize);
			// const paginatedItems = filteredItems; // .splice(pageNumber * pageSize, pageSize);
			// sort
			const sortedItems = this.sortData(filteredItems, sortField, sortOrder);
			// paginate
			console.log(sortedItems);
			return {
				items: sortedItems,
				totalCount: categories.length,
				errorMessage: ''
			};
		}), take(1));
	}

	sortData(items, sortField, sortOrder) {
		if (!sortField || !sortOrder || !items) {
			return items;
		}

		return items.sort((a, b) => {
			return (a[sortField] < b[sortField] ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
		});
	}

	createCategory(category: ICategory): Promise<ICategory> {
		if (!category.id) {
			category.id = this.afs.createId();
		}
		return this.afs.collection(this.path).doc(category.id).set(category).then(() => {
			return category;
		});
	}

	removeCategory(categoryId: string): Promise<void> {
		return this.afs.collection(this.path).doc(categoryId).delete();
	}

	updateCategory(category: ICategory): Promise<any> {
		return this.afs.collection(this.path).doc(category.id).update(category);
	}

	getCategoryById(categoryId: string): Observable<ICategory> {
		return this.afs.doc<ICategory>(this.path + '/' + categoryId).valueChanges();
	}

	sortCategories(filteredCategories, sortField, sortOrder) {
		console.log('ToDo');
		console.log(filteredCategories);
		console.log(sortField);
		console.log(sortOrder);
		return filteredCategories;
	}

	/* getCategoryByTitle(title: string): Observable<ICategory> {
	 return this.afs.collection<ICategory>(this.path, ref => ref.where('title', '==', title)).valueChanges().pipe(
	 map((categories: ICategory[]) => {
	 return categories.find((category: ICategory) => {
	 return category.title === title;
	 });
	 })
	 );
	 } */

	setNewCategory(): Observable<ICategory> {
		const category: ICategory = {
			isImported: false,
			title: '',
			description: ' ',
			assignedCategoryType: '',
			creationAt: this.authService.getCreationAt(),
			creationBy: this.authService.getCreationBy(),
			isMainCategory: false
		};
		return of(category);
	}

	/*
	 getCategoriesByCategoryType(linkType: string): Observable<ICategory[]> {
	 return this.categoryTypeService.getCategoryTypeByLink(linkType).pipe(
	 switchMap((categoryType: ICategoryType) => {
	 if (!categoryType) {
	 return of([]);
	 }
	 return this.afs.collection<ICategory>(this.path, ref => ref.where('assignedCategoryType', '==', categoryType.id)).valueChanges();
	 })
	 );
	 }

	 getCategoriesByTitle(title: string): Observable<ICategory[]> {
	 return this.afs.collection<ICategory>(this.path, ref => ref.where('title', '==', title)).valueChanges();
	 }

	 getCategoriesByIds(categoryIds: string[], filterMainCategories?: boolean): Observable<ICategory[]> {
	 if (!categoryIds || categoryIds.length === 0) {
	 return of([]);
	 }

	 const categoryObservables = [];
	 for (let i = 0; i < categoryIds.length; i++) {
	 categoryObservables.push(this.getCategoryById(categoryIds[i]).pipe(
	 take(1),
	 map((category: ICategory) => {
	 if (filterMainCategories) {
	 return filterMainCategories && category.isMainCategory;
	 }
	 return category;
	 }
	 )
	 ));
	 }
	 return forkJoin(...categoryObservables);
	 } */

}

import {BaseDataSource} from '../../../core/_base/crud';
import {Category} from '../_model/category.model';
import {QueryParams} from "@ngrx/data";
import {Observable, of, Subscription} from "rxjs";
import {CategoryDataService} from "../_services/category-data.service";
import {CollectionViewer} from "@angular/cdk/collections";
import {catchError, tap} from "rxjs/operators";

export class CategoriesDataSource extends BaseDataSource {

	constructor(private categoryDataService: CategoryDataService) {
		super();
	}

	loadCategories(queryParams?: QueryParams): Subscription {
		// this.loading$ = of(true);
		return this.categoryDataService.getWithQuery(queryParams).pipe(
			catchError(() => of([])),
			tap(() => {
				// this.loading$ = of(false);
				this.isPreloadTextViewed$ = of(false);
			}))
			.subscribe(categories => {
				console.log(categories);
				// this.paginatorTotalSubject.next(categories.length);
				this.entitySubject.next(categories);
			});
	}

	connect(collectionViewer: CollectionViewer): Observable<Category[]> {
		this.categoryDataService.getAll().subscribe((allCategories) => {
			this.paginatorTotalSubject.next(allCategories.length);
		});
		return super.connect(collectionViewer);
	}

	disconnect(collectionViewer: CollectionViewer): void {
		super.disconnect(collectionViewer);
	}
}

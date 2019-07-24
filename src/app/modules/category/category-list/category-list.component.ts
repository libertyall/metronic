import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Category } from '../_model/category.model';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../core/_base/crud';
import { MatPaginator, MatSort, MatSortable } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent, merge, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SubheaderService } from '../../../core/_base/layout';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';

@Component({
	selector: 'kt-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

	// dataSource: CategoriesDataSource;
	displayedColumns = ['select', 'id', 'title', 'actions'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', {static: true}) sort: MatSort;

	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	selection = new SelectionModel<Category>(true, []);
	categorysResult: Category[] = [];
	allCategorys: Category[] = [];

	pageSizes: number[] = [3, 5, 10];
	selectedPageSize: number = 10;

	private subscriptions: Subscription[] = [];

	constructor(private activatedRoute: ActivatedRoute,
				private store: Store<AppState>,
				private translateService: TranslateService,
				private router: Router,
				private layoutUtilsService: LayoutUtilsService,
				private subheaderService: SubheaderService) {
	}

	ngOnInit() {
		this.sort.sort(({id: 'title', start: 'asc'}) as MatSortable);

		const categoriesSubscription = this.store.pipe(select(null)).subscribe((res: Category[]) => this.allCategorys = res);
		this.subscriptions.push(categoriesSubscription);

		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadCategoryList())).subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(500),
			distinctUntilChanged(),
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadCategoryList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.subheaderService.setTitle( 'category.subheader.title');

		// this.dataSource = new CategoriesDataSource(this.store);
		/* const entitiesSubscription = this.dataSource.entitySubject.pipe(
		 skip(1),
		 distinctUntilChanged()
		 ).subscribe(res => {
		 this.categorysResult = res;
		 });
		 this.subscriptions.push(entitiesSubscription);*/
		this.loadCategoryList();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadCategoryList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// this.store.dispatch(loadCategoryPage({page: queryParams}));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		filter.title = this.searchInput.nativeElement.value;
		return filter;
	}

	deleteCategory(_item: Category) {
		const _title: string = this.translateService.instant('category.delete.title', {'title': _item.title});
		const _description: string = this.translateService.instant('category.delete.question');
		const _waitDescription: string = this.translateService.instant('category.delete.waitDescription', {'title': _item.title});
		const _deleteMessage = this.translateService.instant('category.delete.success');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			// this.store.dispatch(deleteCategory({category: _item}));
			this.layoutUtilsService.showActionNotification(_deleteMessage, 'danger', MessageType.Delete);
		});
	}

	fetchCategories() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.title}`, // ${ elem.email }, ${ elem.lastName }, ${ elem.displayName }
				id: elem.id.toString(),
				status: elem.title
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.categorysResult.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.categorysResult.length) {
			this.selection.clear();
		} else {
			this.categorysResult.forEach(row => this.selection.select(row));
		}
	}

	editCategory(category: Category): void {
		this.router.navigate(['/categories/edit', category.id]).then();
	}

	showCategory(category: Category): void {
		// this.store.dispatch()
		this.router.navigate(['/categories/detail', category.id]).then();
	}

}

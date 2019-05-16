import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, Subscription} from 'rxjs';
import {ICategory} from '../../../../shared/interfaces/category.interface';
import {MatPaginator, MatSort, MatSortable} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
import {LayoutUtilsService, MessageType, QueryParamsModel} from '../../../../core/_base/crud';
import {SubheaderService} from '../../../../core/_base/layout';
import {debounceTime, distinctUntilChanged, skip, tap} from 'rxjs/operators';
import {CategoriesDataSource} from '../../../../core/category/_data-sources/categories.data-source';
import {selectAllCategories} from '../../../../core/category/_selectors/category.selectors';
import {CategoriesPageRequested, CategoryDeleted} from '../../../../core/category/_actions/category.actions';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'categories',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit, OnDestroy {

	dataSource: CategoriesDataSource;
	displayedColumns = ['select', 'id', 'title', 'actions'];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;

	@ViewChild('searchInput') searchInput: ElementRef;

	selection = new SelectionModel<ICategory>(true, []);
	categoriesResult: ICategory[] = [];
	allCategories: ICategory[] = [];

	pageSizes: number[] = [3, 5, 10];
	selectedPageSize: number = 10;

	private subscriptions: Subscription[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService,
		private subheaderService: SubheaderService) {
	}

	ngOnInit() {
		this.sort.sort(({id: 'title', start: 'asc'}) as MatSortable);

		const categoriesSubscription = this.store.pipe(select(selectAllCategories)).subscribe(res => this.allCategories = res);
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

		this.subheaderService.setTitle({
			title: 'category.subheader.title',
			desc: 'category.subheader.desc'
		});

		this.dataSource = new CategoriesDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.categoriesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
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
		this.store.dispatch(new CategoriesPageRequested({page: queryParams}));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		filter.title = this.searchInput.nativeElement.value;
		return filter;
	}

	deleteCategory(_item: ICategory) {
		const _title: string = 'Category Delete';
		const _description: string = 'Are you sure to permanently delete this category?';
		const _waitDescription: string = 'Deleting Category ' + _item.title;
		const _deleteMessage = `Category has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new CategoryDeleted({id: _item.id}));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
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
		const numRows = this.categoriesResult.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.categoriesResult.length) {
			this.selection.clear();
		} else {
			this.categoriesResult.forEach(row => this.selection.select(row));
		}
	}

	editCategory(id: string): void {
		this.router.navigate(['/categories/edit', id]).then(() => console.log('edit category'));
	}

}

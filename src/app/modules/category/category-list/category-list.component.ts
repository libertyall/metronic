import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../_model/category.model';
import {LayoutUtilsService} from '../../../core/_base/crud';
import {MatPaginator, MatSort, MatSortable} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {fromEvent, merge, Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SubheaderService} from '../../../core/_base/layout';
import {debounceTime, distinctUntilChanged, map, skip, tap} from 'rxjs/operators';
import {CategoriesDataSource} from '../_data-sources/categories.data-source';
import {QueryParams} from '@ngrx/data';
import {CategoryDataService} from "../_services/category-data.service";

@Component({
	selector: 'kt-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, AfterViewInit, OnDestroy {

	dataSource: CategoriesDataSource;
	displayedColumns = ['select', 'id', 'title', 'parentCategory', 'actions'];

	// @Output() selectedCategory: EventEmitter<Category> = new EventEmitter<Category>(false);

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	private subscriptions: Subscription[] = [];

	selection = new SelectionModel<Category>(true, []);
	categoriesResult: Category[] = [];

	allCategories$: Observable<Category[]>;

	pageSizes: number[] = [5, 10, 25, 50];


	constructor(private activatedRoute: ActivatedRoute,
				private categoryDataService: CategoryDataService,
				private translateService: TranslateService,
				private router: Router,
				private layoutUtilsService: LayoutUtilsService,
				private subheaderService: SubheaderService) {
	}

	ngOnInit() {
		this.dataSource = new CategoriesDataSource(this.categoryDataService);
		this.allCategories$ = this.categoryDataService.getAll();

		this.sort.sort(({id: 'title', start: 'asc'}) as MatSortable);
		this.paginator.pageSize = this.pageSizes[0];

		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => this.categoriesResult = res);
		this.subscriptions.push(entitiesSubscription);

		this.allCategories$ = this.categoryDataService.getAll();

		this.subheaderService.setTitle('category.subheader.title');
		this.loadCategoryList();
	}

	ngAfterViewInit(): void {
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
		).subscribe();
		this.subscriptions.push(searchSubscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadCategoryList() {
		this.selection.clear();
		const query: QueryParams = {
			filterConfiguration: this.filterConfiguration(),
			direction: this.sort.direction,
			active: this.sort.active,
			pageIndex: String(this.paginator.pageIndex),
			pageSize: String(this.paginator.pageSize)
		};
		this.dataSource.loadCategories(query);
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		filter.title = this.searchInput.nativeElement.value;
		return filter;
	}

	/*
	deleteCategory(_item: Category) {
		const _title: string = this.translateService.instant('category.delete.title', {'title': _item.title});
		const _description: string = this.translateService.instant('category.delete.description');
		const _waitDescription: string = this.translateService.instant('category.delete.waitDescription', {'title': _item.title});
		const _deleteMessage = this.translateService.instant('category.delete.success');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.categoryService.delete(_item.id);
			// this.store.dispatch(deleteCategory({category: _item}));
			// this.layoutUtilsService.showActionNotification(_deleteMessage, 'danger', MessageType.Delete);
		});
	}*/

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

	/*
	editCategory(category: Category): void {
		if (!category) {
			category = {
				title: ''
			};
		}
		this.selectedCategory.emit(category);
	}

	showCategory(category: Category): void {
		// this.store.dispatch()
		this.router.navigate(['/categories/detail', category.id]).then();
	} */

}

import {
	AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import { Category } from '../../_model/category.model';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, SortDirection } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubheaderService } from '../../../../core/_base/layout';
import { FirestoreService } from '../../../../shared/services/firestore.service';

export interface FirestoreQueryParams {
	filterConfiguration: any;
	direction: SortDirection;
	active: string;
	pageIndex: string;
	pageSize: string;
}

@Component({
	selector: 'kt-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {

	dataSource = new MatTableDataSource<Category>(); // CategoriesDataSource;
	displayedColumns = ['select', 'id', 'title', 'parentCategory', 'actions'];

	@Output() selectedCategory: EventEmitter<Category> = new EventEmitter<Category>(false);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	@ViewChild('table', { static: true }) table: MatTable<Category[]>;

	// private subscriptions: Subscription[] = [];

	selection = new SelectionModel<Category>(true, []);
	categories: Category[] = [];
	isLoading: boolean = true;

	// allCategories: Category[];

	pageSizes: number[] = [5, 10, 25, 50];


	constructor(private activatedRoute: ActivatedRoute,
				private categoryDataService: FirestoreService,
				private translateService: TranslateService,
				private router: Router,
				private firestoreService: FirestoreService,
				private layoutUtilsService: LayoutUtilsService,
				private subheaderService: SubheaderService) {
	}

	ngOnInit() {
		// this.dataSource = new CategoriesDataSource(this.categoryDataService);
		// this.dataSource.loadCategories();

		this.sort.sort({ id: 'title', start: 'asc', disableClear: false });
		this.paginator.pageSize = this.pageSizes[1];

		this.firestoreService.col('categories').valueChanges().subscribe((categories: Category[]) => {
			this.isLoading = false;
			this.dataSource.data = this.categories = categories;
		});
		/*

		 // If the user changes the sort order, reset back to the first page.
		 const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		 this.subscriptions.push(sortSubscription);

		 /* Data load will be triggered in two cases:
		 - when a pagination event occurs => this.paginator.page
		 - when a sort event occurs => this.sort.sortChange
		 **
		 const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(tap((params: any) => this.loadCategoryList(params))).subscribe();
		 this.subscriptions.push(paginatorSubscriptions);

		 // Filtration, bind to searchInput
		 const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
		 // tslint:disable-next-line:max-line-length
		 debounceTime(500), // The user can type quite quickly in the input box, and that could trigger a lot of
		 // server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
		 distinctUntilChanged(), // This operator will eliminate duplicate values
		 tap(() => {
		 this.paginator.pageIndex = 0;
		 this.loadCategoryList({});
		 })
		 )
		 .subscribe();
		 this.subscriptions.push(searchSubscription);

		 // Init DataSource
		 this.dataSource = new CategoriesDataSource(this.categoryDataService);
		 const entitiesSubscription = this.dataSource.entitySubject.pipe(
		 skip(1),
		 distinctUntilChanged()
		 ).subscribe(res => {
		 this.categoriesResult = res;
		 });
		 this.subscriptions.push(entitiesSubscription);
		 // First load */
		// this.loadCategoryList();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
		// this.subscriptions.forEach(el => el.unsubscribe());
	}

	filterDataSource($event: string): void {
		this.dataSource.filter = $event.trim().toLocaleLowerCase();
	}

	/* loadCategoryList(params = {}) {
	 this.selection.clear();
	 const query: FirestoreQueryParams = {
	 filterConfiguration: this.searchInput.nativeElement.value,
	 direction: this.sort.direction,
	 active: this.sort.active,
	 pageIndex: String(this.paginator.pageIndex),
	 pageSize: String(this.paginator.pageSize)
	 };
	 // this.dataSource.loadCategories({ ...query, ...params });
	 this.selection.clear();
	 } */

	deleteCategory(_item: Category) {
		const _title: string = this.translateService.instant('category.delete.title', { 'title': _item.title });
		const _description: string = this.translateService.instant('category.delete.description');
		const _waitDescription: string = this.translateService.instant('category.delete.waitDescription', { 'title': _item.title });
		const _deleteMessage = this.translateService.instant('category.delete.success');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.firestoreService.delete(this.firestoreService.doc('categories/' + _item.id)).then(
				() => this.layoutUtilsService.showActionNotification(_deleteMessage, 'danger', MessageType.Delete));
		});
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.categories.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.categories.length) {
			this.selection.clear();
		} else {
			this.categories.forEach(row => this.selection.select(row));
		}
	}

	editCategory(category: Category): void {
		this.selectedCategory.emit(category);
	}

	addCategory(): void {
		const category = {
			title: '',
			publication: {},
			creation: {}
		};
		this.selectedCategory.emit(category);
	}

	showCategory(category: Category): void {
		// this.store.dispatch()
		// this.router.navigate(['/categories/detail', category.id]).then();
	}
}

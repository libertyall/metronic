import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Article } from '../_model/article.model';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../core/_base/crud';
import { MatPaginator, MatSort, MatSortable } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent, merge, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../store/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SubheaderService } from '../../../core/_base/layout';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { ArticlesDataSource } from '../_data-sources/articles.data-source';

@Component({
  selector: 'kt-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

	dataSource: ArticlesDataSource;
	displayedColumns = ['select', 'id', 'title', 'actions'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', {static: true}) sort: MatSort;

	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	selection = new SelectionModel<Article>(true, []);
	articlesResult: Article[] = [];
	allArticles: Article[] = [];

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

		const categoriesSubscription = this.store.pipe(select(null)).subscribe((res: Article[]) => this.allArticles = res);
		this.subscriptions.push(categoriesSubscription);

		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadArticleList())).subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(500),
			distinctUntilChanged(),
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadArticleList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.subheaderService.setTitle( 'article.subheader.title');

		// this.dataSource = new CategoriesDataSource(this.store);
		/* const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.articlesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);*/
		this.loadArticleList();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadArticleList() {
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

	deleteArticle(_item: Article) {
		const _title: string = this.translateService.instant('article.delete.title', {'title': _item.title});
		const _description: string = this.translateService.instant('article.delete.question');
		const _waitDescription: string = this.translateService.instant('article.delete.waitDescription', {'title': _item.title});
		const _deleteMessage = this.translateService.instant('article.delete.success');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			// this.store.dispatch(deleteCategory({article: _item}));
			this.layoutUtilsService.showActionNotification(_deleteMessage, 'danger' ,MessageType.Delete);
		});
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.articlesResult.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.articlesResult.length) {
			this.selection.clear();
		} else {
			this.articlesResult.forEach(row => this.selection.select(row));
		}
	}

	editArticle(article: Article): void {
		this.router.navigate(['/categories/edit', article.id]).then();
	}

	showArticle(article: Article): void {
		// this.store.dispatch()
		this.router.navigate(['/articles/detail', article.id]).then();
	}

}

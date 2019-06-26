import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { fromEvent, merge, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { SubheaderService } from '../../../../../core/_base/layout';
import { UsersDataSource } from '../../../../../core/auth/_data-sources/users.datasource';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';
import { UserDeleted, UsersPageRequested } from '../../../../../core/auth/_actions/user.actions';
import { selectAllRoles } from '../../../../../core/auth/_selectors/role.selectors';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';

@Component({
	selector: 'kt-users-list',
	templateUrl: './users-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {

	dataSource: UsersDataSource;
	displayedColumns = ['select', 'id', 'displayName', 'email', 'firstName', 'lastName', 'assignedRoles', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	selection = new SelectionModel<IUser>(true, []);
	usersResult: IUser[] = [];
	allRoles: Role[] = [];
	userRoles: Role[] = [];

	private subscriptions: Subscription[] = [];

	constructor(private activatedRoute: ActivatedRoute,
				private store: Store<AppState>,
				private router: Router,
				private translate: TranslateService,
				private layoutUtilsService: LayoutUtilsService,
				private subheaderService: SubheaderService) {
	}

	ngOnInit() {
		const rolesSubscription = this.store.pipe(select(selectAllRoles)).subscribe(res => this.allRoles = res);
		this.subscriptions.push(rolesSubscription);

		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadUsersList())).subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(150),
			distinctUntilChanged(),
			map(() => {
				this.paginator.pageIndex = 0;
				this.loadUsersList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.subheaderService.setTitle({
			title: 'user.subheader.title',
			desc: 'user.subheader.desc'
		});

		this.dataSource = new UsersDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.usersResult = res;
		});
		this.subscriptions.push(entitiesSubscription);

		this.loadUsersList();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadUsersList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.store.dispatch(new UsersPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;
		filter.lastName = searchText;
		filter.firstName = searchText;
		filter.displayName = searchText;
		filter.email = searchText;
		return filter;
	}

	deleteUser(_item: IUser) {
		const _title: string = this.translate.instant('user.delete.dialog.title');
		const _description: string = this.translate.instant('user.delete.dialog.question');
		const _waitDescription: string = this.translate.instant('user.delete.dialog.waitDescription');
		const _deleteMessage = this.translate.instant('user.delete.dialog.successMessage');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new UserDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.usersResult.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.usersResult.length) {
			this.selection.clear();
		} else {
			this.usersResult.forEach(row => this.selection.select(row));
		}
	}

	getUserRolesStr(user: IUser): string {
		if (!this.userRoles[user.id]) {
			const titles: string[] = [];
			if (user && user.assignedRoles) {
				user.assignedRoles.forEach((assignedRole: string) => {
					const _role = find(this.allRoles, (role: Role) => {
						return role.id === assignedRole;
					});
					if (_role) {
						titles.push(this.translate.instant('user.roles.' + _role.title));
					}
				});
			}
			return this.userRoles[user.id] = titles.join(', ');
		} else {
			return this.userRoles[user.id];
		}
	}

	deleteAll() {
		this.selection.selected.forEach((user: IUser) => {
			console.log(user.id);
		});
	}
}

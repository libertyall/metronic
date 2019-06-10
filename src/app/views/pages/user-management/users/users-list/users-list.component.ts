import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { fromEvent, merge, Subscription } from 'rxjs';
import { find } from 'lodash';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { SubheaderService } from '../../../../../core/_base/layout';
import { UsersDataSource } from '../../../../../core/auth/_data-sources/users.datasource';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';
import { selectAllRoles } from '../../../../../core/auth/_selectors/role.selectors';
import { UserDeleted, UsersPageRequested } from '../../../../../core/auth/_actions/user.actions';

@Component({
	selector: 'kt-users-list',
	templateUrl: './users-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {

	dataSource: UsersDataSource;
	displayedColumns = ['select', 'id', 'username', 'email', 'fullname', '_roles', 'actions'];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', {static: true}) sort: MatSort;

	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	selection = new SelectionModel<IUser>(true, []);
	usersResult: IUser[] = [];
	allRoles: Role[] = [];

	private subscriptions: Subscription[] = [];

	constructor(private activatedRoute: ActivatedRoute,
				private store: Store<AppState>,
				private router: Router,
				private layoutUtilsService: LayoutUtilsService,
				private subheaderService: SubheaderService) {
	}

	ngOnInit() {
		const rolesSubscription = this.store.pipe(select(selectAllRoles)).subscribe(res => this.allRoles = res);
		this.subscriptions.push(rolesSubscription);

		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => {
				this.loadUsersList();
			})
		)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadUsersList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.subheaderService.setTitle('User management');

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

		filter.username = searchText;
		filter.email = searchText;
		filter.fillname = searchText;
		return filter;
	}

	deleteUser(_item: IUser) {
		const _title: string = 'User Delete';
		const _description: string = 'Are you sure to permanently delete this user?';
		const _waitDesciption: string = 'User is deleting...';
		const _deleteMessage = `User has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new UserDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

	fetchUsers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${ elem.firstName }, ${ elem.email }, ${ elem.lastName }, ${ elem.displayName }`,
				id: elem.id.toString(),
				status: elem.displayName
			});
		});
		this.layoutUtilsService.fetchElements(messages);
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
		const titles: string[] = [];
		user.assignedRoles.forEach((assignedRole: Role) => {
			const _role = find(this.allRoles, (role: Role) => role.id === assignedRole.id);
			if (_role) {
				titles.push(_role.title);
			}
		});
		return titles.join(', ');
	}

	editUser(id) {
		this.router.navigate(['../users/edit', id], { relativeTo: this.activatedRoute }).then(() => console.log('edit user'));
	}
}

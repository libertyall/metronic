import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { fromEvent, merge, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { AppState } from '../../../../../core/reducers';
import { RoleEditDialogComponent } from '../role-edit/role-edit.dialog.component';
import { RolesDataSource } from '../../../../../core/auth/_data-sources/roles.datasource';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';
import { RoleDeleted, RolesPageRequested } from '../../../../../core/auth/_actions/role.actions';


@Component({
	selector: 'kt-roles-list',
	templateUrl: './roles-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent implements OnInit, OnDestroy {

	dataSource: RolesDataSource;
	displayedColumns = [ 'select', 'id', 'title', 'actions' ];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;

	@ViewChild('searchInput') searchInput: ElementRef;

	selection = new SelectionModel<Role>(true, []);
	rolesResult: Role[] = [];

	private subscriptions: Subscription[] = [];

	constructor(
		private store: Store<AppState>,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService) {
	}

	ngOnInit() {
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => {
				this.loadRolesList();
			})
		)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadRolesList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.dataSource = new RolesDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.rolesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);

		this.loadRolesList();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadRolesList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.store.dispatch(new RolesPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		filter.title = this.searchInput.nativeElement.value;
		return filter;
	}

	deleteRole(_item: Role) {
		const _title: string = 'User Role';
		const _description: string = 'Are you sure to permanently delete this role?';
		const _waitDesciption: string = 'Role is deleting...';
		const _deleteMessage = `Role has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new RoleDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.loadRolesList();
		});
	}

	fetchRoles() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${ elem.title }`,
				id: elem.id.toString()
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Add role
	 */
	addRole() {
		const newRole: Role = { id: '', title: '', permissions: [], isCoreRole: false };
		this.editRole(newRole);
	}

	editRole(role: Role) {
		const _saveMessage = `Role successfully has been saved.`;
		const _messageType = role.id ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(RoleEditDialogComponent, { data: { roleId: role.id } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
			this.loadRolesList();
		});
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.rolesResult.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.rolesResult.length) {
			this.selection.clear();
		} else {
			this.rolesResult.forEach(row => this.selection.select(row));
		}
	}
}

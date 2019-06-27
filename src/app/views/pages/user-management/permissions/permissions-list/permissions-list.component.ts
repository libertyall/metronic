import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Permission } from '../../../../../core/auth/_interfaces/permission.interface';
import { fromEvent, merge, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { debounceTime, distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { PermissionsPageRequested } from '../../../../../core/auth/_actions/permission.actions';
import { UserDeleted } from '../../../../../core/auth/_actions/user.actions';
import { PermissionEditDialogComponent } from '../permission-edit/permission-edit.dialog.component';
import { PermissionsDataSource } from '../../../../../core/auth/_data-sources/permissions.datasource';

@Component({
	selector: 'kt-permissions-list',
	templateUrl: './permissions-list.component.html',
	styleUrls: ['./permissions-list.component.scss']
})
export class PermissionsListComponent implements OnInit, OnDestroy {

	dataSource: PermissionsDataSource;
	displayedColumns = ['select', 'id', 'title', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	selection = new SelectionModel<Permission>(true, []);
	permissionsResult: Permission[] = [];

	private subscriptions: Subscription[] = [];

	constructor(private translate: TranslateService,
				private store: Store<AppState>,
				public dialog: MatDialog,
				public snackBar: MatSnackBar,
				private layoutUtilsService: LayoutUtilsService) {
	}

	ngOnInit() {
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(map(() => this.loadPermissionsList())).subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadPermissionsList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.dataSource = new PermissionsDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.permissionsResult = res;
		});
		this.subscriptions.push(entitiesSubscription);

		this.loadPermissionsList();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadPermissionsList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.store.dispatch(new PermissionsPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		filter.title = this.searchInput.nativeElement.value;
		return filter;
	}

	deletePermission(_item: Permission) {
		const _title: string = this.translate.instant('user.permission.delete.dialog.title');
		const _description: string = this.translate.instant('user.permission.delete.dialog.question');
		const _waitDescription: string = this.translate.instant('user.permission.delete.dialog.waitDescription');
		const _deleteMessage = this.translate.instant('user.permission.delete.dialog.successMessage');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new UserDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

	addPermission() {
		const newPermission: Permission = {
			id: '', title: '', _children: [], isSelected: false, parentId: '', level: 0, name: ''
		};
		this.editPermission(newPermission);
	}

	editPermission(permission: Permission) {

		const _canceledMessage = this.translate.instant('dialog.canceledMessage');
		const _editMessage = this.translate.instant('user.permission.edit.dialog.successMessage');
		const _saveMessage = this.translate.instant('user.permission.create.dialog.successMessage');

		const _messageType = permission.id ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(PermissionEditDialogComponent, { data: { permissionId: permission.id } });

		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			if (res.isEdit || res.isNew) {
				res.isEdit ?
					this.layoutUtilsService.showActionNotification(_editMessage, _messageType, 10000, true, true)
					:
					this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
				this.loadPermissionsList();
			} else {
				this.layoutUtilsService.showActionNotification(_canceledMessage, MessageType.Canceled, 10000, true, false);
			}
		});
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.permissionsResult.length;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.selection.selected.length === this.permissionsResult.length) {
			this.selection.clear();
		} else {
			this.permissionsResult.forEach(row => this.selection.select(row));
		}
	}

	deleteAll(): void {
		console.log(this.selection.selected);
	}

}

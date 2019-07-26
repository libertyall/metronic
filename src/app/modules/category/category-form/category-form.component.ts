import {
	ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
	SimpleChanges, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../_model/category.model';
import { SubheaderService } from '../../../core/_base/layout';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
import { Update } from '@ngrx/entity';
import { AppEntityServices } from '../../../store/entity/app-entity-services';
import * as _ from 'lodash';
import { EntityServices } from '@ngrx/data';

@Component({
	selector: 'kt-category-form',
	templateUrl: 'category-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoryFormComponent implements OnInit, OnDestroy {

	@Input() category: Category;
	@Output() cancelEdit: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	allCategories$: Observable<Category[]>;
	destroy$ = new Subject();

	public selectedTab: number = 0;
	public loading$: Observable<boolean>;
	public hasFormErrors: boolean = false;

	public oldCategory: Category;
	public form: FormGroup;
	public titleMaxLength = 50;

	public titleParams = {
		minLength: 3,
		maxLength: 50
	};
	public pageTitle: string;

	// private subscriptions: Subscription[] = [];

	constructor(private snackBar: MatSnackBar,
				private translateService: TranslateService,
				private fb: FormBuilder,
				private subheaderService: SubheaderService,
				private store: Store<AppState>,
				private activatedRoute: ActivatedRoute,
				private layoutUtilsService: LayoutUtilsService,
				private entityServices: EntityServices,
				private router: Router) {
	}

	ngOnInit() {
		this.initCategory();
		this.allCategories$ = this.entityServices.getEntityCollectionService('Category').getAll();
		this.loading$ = this.entityServices.getEntityCollectionService('Category').loading$;
	}

	ngOnDestroy() {
		this.destroy$.next();
	}

	initCategory() {
		this.oldCategory = _.clone(this.category);

		this.createForm();

		if (!this.category.id) {
			this.subheaderService.setTitle('Create category');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Category List', page: `categories` },
				{ title: 'Create category', page: `categories/edit` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit category');
		this.subheaderService.setBreadcrumbs([
			{ title: 'Category List', page: `categories` },
			{ title: 'Edit category', page: `categories/edit`, queryParams: { id: this.category.id } }
		]);
	}

	createForm() {
		this.form = this.fb.group({
			title: [this.category ? this.category.title : '', [Validators.required, Validators.minLength(3), Validators.maxLength(this.titleMaxLength)]],
			parentCategoryId: [this.category ? this.category.parentCategoryId : '', [Validators.required]],
			description: this.category ? this.category.description : '',
			creation: this.fb.group({
				by: this.category.creation ? this.category.creation.by : '',
				at: this.category.creation ? this.category.creation.at : ''
			}),
			isMainCategory: this.category ? this.category.isMainCategory : false,
			isImported: this.category ? this.category.isImported : false
		});
	}

	goBackToList() {
		this.router.navigate(['/categories']);
	}

	reset() {
		this.category = Object.assign({}, this.oldCategory);
		this.createForm();
		this.hasFormErrors = false;
		this.form.markAsPristine();
		this.form.markAsUntouched();
		this.form.updateValueAndValidity();
	}

	onSubmit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.form.controls;
		if (this.form.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedCategory = this.prepareCategory();
		console.log(editedCategory);
		/* if (editedCategory.id !== '') {
		 this.updateCategory(editedCategory, withBack);
		 return;
		 }

		 this.addCategory(editedCategory, withBack); */
	}

	prepareCategory(): Category {
		const controls = this.form.controls;
		return {
			id: this.category.id,
			title: controls['title'].value,
			description: controls['description'].value,
			isImported: controls['isImported'].value,
			isMainCategory: controls['isMainCategory'].value,
			parentCategoryId: controls['parentCategoryId'].value,
			creation: {
				by: controls['creation']['by'].value,
				at: controls['creation']['at'].value
			}
		};
	}

	addCategory(_category: Category, goToList: boolean = false) {
		console.log(_category);
		/* this.store.dispatch(new CategoryOnServerCreated({ category: _category }));
		 const addSubscription = this.store.pipe(select(selectLastCreatedCategoryId)).subscribe(categoryId => {
		 const message = `category.messages.created`;
		 this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
		 if (categoryId && goToList) {
		 this.goBackToList();
		 }
		 });
		 this.subscriptions.push(addSubscription); */
	}

	updateCategory(_category: Category, goToList: boolean = false) {
		const updatedCategory: Update<Category> = {
			id: _category.id,
			changes: _category
		};
		// this.store.dispatch(new CategoryUpdated({ partialCategory: updatedCategory, category: _category }));
		const message = `category.messages.updated`;
		this.layoutUtilsService.showActionNotification(message, 'warning', MessageType.Update, 5000, true, true);
		if (goToList) {
			this.goBackToList();
		}
	}

	getComponentTitle() {
		if (this.pageTitle) {
			return this.pageTitle;
		}

		if (!this.category || !this.category.id) {
			return this.pageTitle = this.translateService.instant('category.createTitle');
		} else {
			return this.pageTitle = this.translateService.instant('category.editTitle', {
				title: this.category.title
			});
		}
	}

	onAlertClose(): void {
		this.hasFormErrors = false;
	}

	deleteCategory(_item: Category) {
		const _title: string = this.translateService.instant('category.delete.title', { title: _item.title });
		const _description: string = this.translateService.instant('category.delete.description');
		const _waitDescription: string = this.translateService.instant('category.deleteInProgress');
		const _deleteMessage = this.translateService.instant('category.deleted');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			// this.store.dispatch(new CategoryDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, 'danger', MessageType.Delete);
			this.goBackToList();
		});
	}

}

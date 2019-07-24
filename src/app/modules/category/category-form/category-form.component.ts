import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../_model/category.model';
import { SubheaderService } from '../../../core/_base/layout';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
import { Update } from '@ngrx/entity';

@Component({
	selector: 'kt-category-form',
	templateUrl: 'category-form.component.html'
})

export class CategoryFormComponent implements OnInit, OnDestroy {

	public selectedTab: number = 0;
	public loading$: Observable<boolean>;
	public hasFormErrors: boolean = false;

	public category: Category;
	public oldCategory: Category;
	public form: FormGroup;
	public titleMaxLength = 50;

	public titleParams = {
		minLength: 3,
		maxLength: 50
	};
	public pageTitle: string;

	// private subscriptions: Subscription[] = [];

	constructor(// private categoryService: CategoryService,
				private snackBar: MatSnackBar,
				// private alertService: AlertServic,
				private translateService: TranslateService,
				// private categoryTypeService: CategoryTypeService,
				private fb: FormBuilder,
				private subheaderService: SubheaderService,
				private store: Store<AppState>,
				private activatedRoute: ActivatedRoute,
				private layoutUtilsService: LayoutUtilsService,
				private router: Router) {
	}

	ngOnInit() {
		/* this.loading$ = this.store.pipe(select(selectCategoriesActionLoading));

		const routeSubscription = this.activatedRoute.data.subscribe((data: { category: ICategory; categoryTypes: ICategoryType[] }) => {
			this.categoryTypes = data.categoryTypes;
			this.category = data.category;
			this.oldCategory = Object.assign({}, this.category);
			this.initCategory();
		});
		this.subscriptions.push(routeSubscription); */
	}

	ngOnDestroy() {
		// this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	initCategory() {
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
				by: this.category ? this.category.creation.by : '',
				at: this.category ? this.category.creation.at : '',
			}),
			isMainCategory: this.category ? this.category.isMainCategory : false,
			isImported: this.category ? this.category.isImported : false
		});
	}

	goBackToList() {
		this.router.navigate(['/categories']).then();
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

		if (editedCategory.id !== '') {
			this.updateCategory(editedCategory, withBack);
			return;
		}

		this.addCategory(editedCategory, withBack);
	}

	prepareCategory(): Category {
		const controls = this.form.controls;
		return {
			id: this.category.id,
			title: controls['title'].value,
			description: controls['description'].value,
			isImported: controls['isImported'].value,
			isMainCategory: controls['isMainCategory'].value,
			creation: {
				by: controls['creation']['by'].value,
				at: controls['creation']['at'].value,
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

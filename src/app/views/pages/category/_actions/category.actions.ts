import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { QueryParamsModel } from '../../../../core/_base/crud';

export enum CategoryActionTypes {
	AllCategoriesRequested        = '[Categories Module] All Categories Requested',
	AllCategoriesLoaded           = '[Categories API] All Categories Loaded',
	CategoryOnServerCreated       = '[Edit Category Component] Category On Server Created',
	CategoryCreated               = '[Edit Category Dialog] Category Created',
	CategoryUpdated               = '[Edit Category Dialog] Category Updated',
	CategoryDeleted               = '[Categories List Page] Category Deleted',
	CategoriesPageRequested       = '[Categories List Page] Categories Page Requested',
	CategoriesPageLoaded          = '[Categories API] Categories Page Loaded',
	CategoriesPageCancelled       = '[Categories API] Categories Page Cancelled',
	CategoriesPageToggleLoading   = '[Categories] Categories Page Toggle Loading',
	CategoriesActionToggleLoading = '[Categories] Categories Action Toggle Loading'
}

export class AllCategoriesRequested implements Action {
	readonly type = CategoryActionTypes.AllCategoriesRequested;

	constructor() {
	}
}

export class AllCategoriesLoaded implements Action {
	readonly type = CategoryActionTypes.AllCategoriesLoaded;

	constructor() {
	}
}

export class CategoryOnServerCreated implements Action {
	readonly type = CategoryActionTypes.CategoryOnServerCreated;

	constructor(public payload: { category: ICategory }) {
	}
}

export class CategoryCreated implements Action {
	readonly type = CategoryActionTypes.CategoryCreated;

	constructor(public payload: { category: ICategory }) {
	}
}


export class CategoryUpdated implements Action {
	readonly type = CategoryActionTypes.CategoryUpdated;

	constructor(public payload: {
		partialCategory: Update<ICategory>,
		category: ICategory
	}) {
	}
}

export class CategoryDeleted implements Action {
	readonly type = CategoryActionTypes.CategoryDeleted;

	constructor(public payload: { id: string }) {
	}
}

export class CategoriesPageRequested implements Action {
	readonly type = CategoryActionTypes.CategoriesPageRequested;

	constructor(public payload: { page: QueryParamsModel }) {
	}
}

export class CategoriesPageLoaded implements Action {
	readonly type = CategoryActionTypes.CategoriesPageLoaded;

	constructor(public payload: { categories: ICategory[], totalCount: number, page: QueryParamsModel }) {
	}
}


export class CategoriesPageCancelled implements Action {
	readonly type = CategoryActionTypes.CategoriesPageCancelled;
}

export class CategoriesPageToggleLoading implements Action {
	readonly type = CategoryActionTypes.CategoriesPageToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export class CategoriesActionToggleLoading implements Action {
	readonly type = CategoryActionTypes.CategoriesActionToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export type CategoryActions = AllCategoriesRequested
	| AllCategoriesLoaded
	| CategoryCreated
	| CategoryUpdated
	| CategoryDeleted
	| CategoryOnServerCreated
	| CategoriesPageLoaded
	| CategoriesPageCancelled
	| CategoriesPageToggleLoading
	| CategoriesPageRequested
	| CategoriesActionToggleLoading;

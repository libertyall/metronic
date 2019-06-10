import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {ICategoryType} from '../../../shared/interfaces/category-type.interface';
import {QueryParamsModel} from '../../_base/crud';

export enum CategoryTypeActionTypes {
	AllCategoryTypesRequested = '[CategoryTypes Module] All CategoryTypes Requested',
	AllCategoryTypesLoaded = '[CategoryTypes API] All CategoryTypes Loaded',
	CategoryTypeRequested = '[View Category Page] CategoryType Requested',
	CategoryTypeOnServerCreated = '[Edit CategoryType Component] CategoryType On Server Created',
	CategoryTypeCreated = '[Edit CategoryType Dialog] CategoryType Created',
	CategoryTypeUpdated = '[Edit CategoryType Dialog] Category Updated',
	CategoryTypeDeleted = '[CategoryTypes List Page] CategoryType Deleted',
	CategoryTypesPageRequested = '[CategoryTypes List Page] CategoryTypes Page Requested',
	CategoryTypesPageLoaded = '[CategoryTypes API] CategoryTypes Page Loaded',
	CategoryTypeLoaded = '[CategoryTypes API] CategoryType Loaded',
	CategoryTypesPageCancelled = '[CategoryTypes API] CategoryTypes Page Cancelled',
	CategoryTypesPageToggleLoading = '[CategoryTypes] CategoryTypes Page Toggle Loading',
	CategoryTypesActionToggleLoading = '[CategoryTypes] CategoryTypes Action Toggle Loading'
}

export class CategoryTypeRequested implements Action {

	readonly type = CategoryTypeActionTypes.CategoryTypeRequested;

	constructor(public payload: { categoryTypeId: string }) {

	}
}

export class CategoryTypeLoaded implements Action {

	readonly type = CategoryTypeActionTypes.CategoryTypeLoaded;

	constructor(public payload: { categoryType: ICategoryType }) {
	}
}

export class AllCategoryTypesRequested implements Action {
	readonly type = CategoryTypeActionTypes.AllCategoryTypesRequested;

	constructor() {
	}
}

export class AllCategoryTypesLoaded implements Action {
	readonly type = CategoryTypeActionTypes.AllCategoryTypesLoaded;

	constructor() {
	}
}

export class CategoryTypeOnServerCreated implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypeOnServerCreated;

	constructor(public payload: { categoryType: ICategoryType }) {
	}
}

export class CategoryTypeCreated implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypeCreated;

	constructor(public payload: { categoryType: ICategoryType }) {
	}
}


export class CategoryTypeUpdated implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypeUpdated;

	constructor(public payload: {
		partialCategoryType: Update<ICategoryType>,
		categoryType: ICategoryType
	}) {
	}
}

export class CategoryTypeDeleted implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypeDeleted;

	constructor(public payload: { id: string }) {
	}
}

export class CategoryTypesPageRequested implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypesPageRequested;

	constructor(public payload: { page: QueryParamsModel }) {
	}
}

export class CategoryTypesPageLoaded implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypesPageLoaded;

	constructor(public payload: { categoryTypes: ICategoryType[], totalCount: number, page: QueryParamsModel }) {
	}
}


export class CategoryTypesPageCancelled implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypesPageCancelled;
}

export class CategoryTypesPageToggleLoading implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypesPageToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export class CategoryTypesActionToggleLoading implements Action {
	readonly type = CategoryTypeActionTypes.CategoryTypesActionToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export type CategoryTypesActions = AllCategoryTypesRequested
	| AllCategoryTypesLoaded
	| CategoryTypeRequested
	| CategoryTypeCreated
	| CategoryTypeUpdated
	| CategoryTypeDeleted
	| CategoryTypeOnServerCreated
	| CategoryTypeLoaded
	| CategoryTypesPageLoaded
	| CategoryTypesPageCancelled
	| CategoryTypesPageToggleLoading
	| CategoryTypesPageRequested
	| CategoryTypesActionToggleLoading;

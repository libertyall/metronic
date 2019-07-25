import { BaseModel } from '../../../core/_base/crud';

export class Category extends BaseModel {
	title: string;
	description?: string;
	isImported?: boolean;
	isMainCategory?: boolean;
	parentCategoryId?: string;
}

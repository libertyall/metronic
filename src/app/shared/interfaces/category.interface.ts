export interface ICategory {
	id?: string;
	title: string;
	description: string;
	isImported: boolean;
	isMainCategory: boolean;
	creationAt?: any;
	creationBy: string;

	assignedCategoryType?: {
		title: string;
		id: string;
	};
}

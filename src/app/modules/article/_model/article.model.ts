import { BaseModel } from '../../../core/_base/crud';

export class Article extends BaseModel {

	excerpt: string;
	text: string;

	constructor() {
		super();
		const article: Article = {
			excerpt: '',
			text: '',
			publication: {
				at: null,
				by: null,
				status: 0
			},
			creation: {
				at: new Date(),
				by: '',
			},
			title: '',
			isImported: false
		};
		return article;
	}

}

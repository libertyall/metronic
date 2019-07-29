import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '../_model/category.model';
import {Sponsor} from "../../sponsor/_model/sponsor.class";

@Pipe({
	name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

	transform(sponsors: Sponsor[], searchField: string, categories: Category[]): any[] {

		if (!sponsors) {
			return;
		}

		if (!categories) {
			return sponsors;
		}

		return categories.filter((category: Category) => {
			if (typeof category[searchField] === 'string') {
				return sponsors.some((sponsor: Sponsor) => {
					return category[searchField] === sponsor.id;
				});
			} else {
				return categories.some((cat: Category) => {
					return category[searchField].indexOf(cat.id) > -1;
				});
			}
		});
	}

}

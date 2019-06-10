import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'categories-by-category-type',
	templateUrl: 'categories-by-category-type.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesByCategoryTypeComponent implements OnChanges {

	@Input() categories: ICategory[];
	@Input() categoryTypes: ICategoryType[];

	public isDataAvailable = false;

	globalChartOptions: any = {
		responsive: true,
		legend: {
			display: true,
			position: 'bottom'
		}
	};

	doughnutChartLabels: string[] = [];
	doughnutChartData: number[] = [];
	doughnutChartType: Chart.ChartType = 'doughnut';
	doughnutOptions: any = Object.assign({
		elements: {
			arc: {
				borderWidth: 0
			}
		}
	}, this.globalChartOptions);

	constructor(private translateService: TranslateService) {
	}

	ngOnChanges() {
		if (this.categories && this.categoryTypes) {
			for (let i = 0; i < this.categoryTypes.length; i++) {
				let categoryCounter = 0;
				for (let j = 0; j < this.categories.length; j++) {
					/* if (this.categories[j].assignedCategoryType === this.categoryTypes[i].id) {
						categoryCounter++;
					} */
					console.log('TODO');
				}
				this.translateService.get('general.menu.' + this.categoryTypes[i].link + '.main').subscribe(
					(translation: string) => this.doughnutChartLabels.push(translation)
				);
				this.doughnutChartData.push(categoryCounter);
			}
			this.isDataAvailable = true;
		}
	}

}

import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
  selector: 'article-authors-stats',
  templateUrl: './article-authors-stats.component.html',
  styleUrls: ['./article-authors-stats.component.scss']
})
export class ArticleAuthorsStatsComponent implements OnInit {

  /* @Input() articles: {};
  @Input() users: IUser[];

  public isDataAvailable = false;

  globalChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom'
    }
  };

  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType = 'doughnut';
  options: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.globalChartOptions); */

  constructor() {
  }

  ngOnInit() {
    /* if (this.articles) {
      for (const memberId in this.articles) {
        const value: IArticle[] = this.articles[memberId];

        const author = this.users.find((user: IUser) => {
          return user.id === memberId;
        });
        const name = author.firstName && author.lastName ? author.firstName + ' ' + author.lastName : author.email;
        this.chartLabels.push(name);

        this.chartData.push(value.length);
      }

      this.isDataAvailable = true;
    } */
  }

}

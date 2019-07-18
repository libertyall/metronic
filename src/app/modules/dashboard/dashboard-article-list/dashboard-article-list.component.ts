import { Component } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
	// tslint:disable-next-line:component-selector
  selector: 'dashboard-article-list',
  templateUrl: './dashboard-article-list.component.html',
  styleUrls: ['./dashboard-article-list.component.scss']
})
export class DashboardArticleListComponent {

  public maxItems = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField = 'creationAt';
  public listType = 'articles';
  public viewPortHeight = '50vh';
  public showText = false;

  constructor() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'article-dashboard',
	templateUrl: './article-dashboard.component.html'
})
export class ArticleDashboardComponent implements OnInit {

	// public articles$: Observable<IArticle[]>;
	// public users$: Observable<IUser[]>;

	constructor(/* private articleService: ArticleService,
				 private userService: UserService */) {
		// this.users$ = userService.users$;
		// this.articles$ = articleService.articles$;
	}

	ngOnInit() {
	}

}

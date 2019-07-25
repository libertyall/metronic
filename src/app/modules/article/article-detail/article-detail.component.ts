import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../_model/article.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
	selector: 'kt-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

	article$: Observable<Article>;

	constructor(private route: ActivatedRoute,
				private store: Store<AppState>) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			// this.store.dispatch(getArticle(+params.id));
		});
		// this.article$ = this.store.select(getArticle);
	}

}

import { Routes } from '@angular/router';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

export const articleRoutes: Routes = [
	{
		path: '',
		component: ArticleDashboardComponent
	},
	{
		path: 'list',
		component: ArticleListComponent,
	},
	{
		path: 'detail/:id',
		component: ArticleDetailComponent,
	},
	{
		path: 'create',
		component: ArticleCreateComponent
		/* resolve: {
			article: ArticleResolver
		}*/
	},
	/*
	 {
	 path: 'matches',
	 component: ArticleMatchesComponent
	 },
	 {
	 path: 'edit/:articleId',
	 component: ArticleEditComponent,
	 resolve: {
	 article: ArticleResolver
	 }
	 },*/
	{
		path: '**',
		redirectTo: ''
	}
];

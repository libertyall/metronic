import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

export const categoryRoutes: Routes = [
	{
		path: '',
		component: CategoriesComponent
	},/*
	{
		path: 'list',
		component: ArticleListComponent,
	},
	{
		path: 'detail/:id',
		component: ArticleDetailComponent,
	},
	/*,
	 {
	 path: 'create',
	 component: ArticleEditComponent,
	 /* resolve: {
	 article: ArticleResolver
	 }
	 },
	 /*
	 {
	 path: 'create',
	 component: ArticleEditComponent,
	 resolve: {
	 article: ArticleResolver
	 }
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

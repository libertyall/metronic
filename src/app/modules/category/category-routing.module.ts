import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
// import {CategoriesResolver} from "./categories.resolver";

export const categoryRoutes: Routes = [
	{
		path: '',
		component: CategoriesComponent,
		/* resolve: {
			categories: CategoriesResolver
		} */
	},/*
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
	 component: CategoryFormComponent
	 },,
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

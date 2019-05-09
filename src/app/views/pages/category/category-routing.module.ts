import { Routes } from '@angular/router';
import { CategoryResolver } from './category.resolver';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';
import { CategoryListComponent } from './category-list/category-list.component';

export const categoryRoutes: Routes = [

	{
		path: '',
		component: CategoryListComponent,
		pathMatch: 'full'
	},
	{
		path: 'create',
		component: CategoryEditComponent,
		resolve: {
			category: CategoryResolver
		}
	},
	{
		path: 'edit/:categoryId',
		component: CategoryEditComponent,
		resolve: {
			category: CategoryResolver
		}
	},
	{
		path: 'detail/:categoryId',
		component: CategoryDetailComponent,
		resolve: {
			category: CategoryResolver
		}
	},
	{
		path: 'statistics',
		component: CategoryStatisticsComponent
	},
	{
		path: '**',
		redirectTo: ''
	}
];

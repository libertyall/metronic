import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AuthGuard } from '../../../core/auth/_guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [ AuthGuard ],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
			}, /* ,
			{
				path: 'articles',
				loadChildren: () => import('app/views/pages/article/article.module').then(m => m.AuthModule),
			}, */
			{
				path: 'categories',
				loadChildren: () => import('app/views/pages/category/category.module').then(m => m.CategoryModule)
			},
			/*{
				path: 'calendar',
				loadChildren: 'app/views/pages/sfw-calendar/sfw-calendar.module#SFWCalendarModule'
			},
			{
				path: 'clubs',
				loadChildren: 'app/views/pages/club/club.module#ClubModule'
			},
			{
				path: 'locations',
				loadChildren: 'app/views/pages/location/location.module#LocationModule'
			},
			{
				path: 'matches',
				loadChildren: 'app/views/pages/match/match.module#MatchModule'
			},
			{
				path: 'members',
				loadChildren: 'app/views/pages/member/member.module#MemberModule'
			},
			{
				path: 'uploader',
				loadChildren: 'app/views/pages/uploader/uploader.module#UploaderModule'
			},*/
			{
				path: 'settings',
				loadChildren: () => import('../../pages/settings/settings.module').then(m => m.SettingsModule)
			},
			/* {
				path: 'sponsors',
				loadChildren: 'app/views/pages/sponsor/sponsor.module#SponsorModule'
			},
			{
				path: 'teams',
				loadChildren: 'app/views/pages/team/team.module#TeamModule'
			}, */
			{
				path: 'users',
				loadChildren: () => import('../../pages/user-management/user-management.module').then(m => m.UserManagementModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
		]
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PagesRoutingModule {
}

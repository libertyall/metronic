import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AuthGuard } from '../../../core/auth/_guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [ AuthGuard ],
		children: [
			{
				path: 'dashboard',
				loadChildren: 'app/views/pages/dashboard/dashboard.module#DashboardModule'
			}, /*
			{
				path: 'articles',
				loadChildren: '../../content/article/article.module#ArticleModule'
			},
			{
				path: 'categories',
				loadChildren: '../../content/category/category.module#CategoryModule'
			},
			{
				path: 'calendar',
				loadChildren: '../../content/sfw-calendar/sfw-calendar.module#SFWCalendarModule'
			},
			{
				path: 'clubs',
				loadChildren: '../../content/club/club.module#ClubModule'
			},
			{
				path: 'locations',
				loadChildren: '../../content/location/location.module#LocationModule'
			},
			{
				path: 'matches',
				loadChildren: '../../content/match/match.module#MatchModule'
			},
			{
				path: 'members',
				loadChildren: '../../content/member/member.module#MemberModule'
			},
			{
				path: 'uploader',
				loadChildren: '../../content/uploader/uploader.module#UploaderModule'
			},*/
			{
				path: 'settings',
				loadChildren: '../../pages/settings/settings.module#SettingsModule'
			}, /*
			{
				path: 'sponsors',
				loadChildren: '../../content/sponsor/sponsor.module#SponsorModule'
			},
			{
				path: 'teams',
				loadChildren: '../../content/team/team.module#TeamModule'
			},
			{
				path: 'users',
				loadChildren: '../../content/user/user.module#UserModule'
			}, */
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

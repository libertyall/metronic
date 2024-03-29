import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import {importExpr} from "@angular/compiler/src/output/output_ast";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
		children: [
			{
				path: 'analytics',
				loadChildren: () => import('app/modules/analytics/analytics.module').then(m => m.AnalyticsModule)
			},
			{
				path: 'articles',
				loadChildren: () => import('app/modules/article/article.module').then(m => m.ArticleModule)
			},
			{
				path: 'cronjobs',
				loadChildren: () => import('app/modules/cronjob/cronjob.module').then(m => m.CronJobModule)
			},
			{
				path: 'calendar',
				loadChildren: () => import('app/modules/calendar/calendar.module').then(m => m.CalendarModule)
			},
			{
				path: 'categories',
				loadChildren: () => import('app/modules/category/category.module').then(m => m.CategoryModule)
			},
			{
				path: 'clubs',
				loadChildren: () => import('app/modules/club/club.module').then(m => m.ClubModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'locations',
				loadChildren: () => import('app/modules/location/location.module').then(m => m.LocationModule)
			},
			{
				path: 'matches',
				loadChildren: () => import('app/modules/match/match.module').then(m => m.MatchModule)
			},
			{
				path: 'members',
				loadChildren: () => import('app/modules/member/member.module').then(m => m.MemberModule)
			},
			{
				path: 'newsletter',
				loadChildren: () => import('app/modules/newsletter/newsletter.module').then(m => m.NewsletterModule)
			},
			{
				path: 'settings',
				loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule)
			},
			{
				path: 'sponsors',
				loadChildren: () => import('app/modules/sponsor/sponsor.module').then(m => m.SponsorModule)
			},
			{
				path: 'teams',
				loadChildren: () => import('app/modules/team/team.module').then(m => m.TeamModule)
			},
			{
				path: 'uploader',
				loadChildren: () => import('app/modules/uploader/uploader.module').then(m => m.UploaderModule)
			},
			/* ,
			 {
			 path: 'users',
			 loadChildren: () => import('app/modules/user/user-management.module').then(m => m.UserManagementModule)
			 }*/
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
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AuthGuard } from '../../../core/auth/_guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			/* {
			 path: 'dashboard',
			 loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			 },*/
			{
				path: 'articles',
				loadChildren: () => import('app/modules/article/article.module').then(m => m.ArticleModule)
			},
			{
				path: 'categories',
				loadChildren: () => import('app/modules/category/category.module').then(m => m.CategoryModule)
			},/*,
			 {
			 path: 'calendar',
			 loadChildren: () => import('app/views/pages/calendar/calendar.module').then(m => m.CalendarModule)
			 },
			 {
			 path: 'clubs',
			 loadChildren: () => import('app/views/pages/club/club.module').then(m => m.ClubModule)
			 },
			 {
			 path: 'locations',
			 loadChildren: () => import('app/views/pages/location/location.module').then(m => m.LocationModule)
			 },
			 {
			 path: 'matches',
			 loadChildren: () => import('app/views/pages/match/match.module').then(m => m.MatchModule)
			 },
			 {
			 path: 'members',
			 loadChildren: () => import('app/views/pages/member/member.module').then(m => m.MemberModule)
			 },*/
			{
				path: 'uploader',
				loadChildren: () => import('app/modules/uploader/uploader.module').then(m => m.UploaderModule)
			},/*
			 {
			 path: 'settings',
			 loadChildren: () => import('app/views/pages/settings/settings.module').then(m => m.SettingsModule)
			 },
			 {
			 path: 'sponsors',
			 loadChildren: () => import('app/views/pages/sponsor/sponsor.module').then(m => m.SponsorModule)
			 },
			 {
			 path: 'teams',
			 loadChildren: () => import('app/views/pages/team/team.module').then(m => m.TeamModule)
			 },
			 {
			 path: 'users',
			 loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
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
			 },*/
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'articles', pathMatch: 'full' },
			{ path: '**', redirectTo: 'articles', pathMatch: 'full' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}

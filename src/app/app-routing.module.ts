import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { UnAuthGuard } from './core/auth/_guards/unauth.guard';
import { AuthGuard } from './core/auth/_guards/auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule),
		// canActivate: [UnAuthGuard]
	},
	{
		path: '',
		loadChildren: () => import('app/views/themes/default/theme.module').then(m => m.ThemeModule),
		canActivate: [AuthGuard]
	},
	{
		path: '**',
		redirectTo: 'default/error/403',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { enableTracing: environment.routerTracing })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

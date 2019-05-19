import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { UnAuthGuard } from './core/auth/_guards/unauth.guard';
import { AuthGuard } from './core/auth/_guards/auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: 'app/views/pages/auth/auth.module#AuthModule',
		canActivate: [UnAuthGuard]
	},
	{
		path: '',
		loadChildren: 'app/views/themes/default/theme.module#ThemeModule',
		// canActivate: [AuthGuard]
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '',
		loadChildren: () => import('app/views/themes/default/theme.module').then(m => m.ThemeModule)
	},
	{
		path: '**',
		redirectTo: 'error/403',
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

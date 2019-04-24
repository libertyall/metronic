import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
	/* {
		path: 'auth',
		loadChildren: 'app/views/pages/auth/auth.module#AuthModule'
	},*/
	{
		path: '',
		loadChildren: 'app/views/themes/default/theme.module#ThemeModule'
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
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}

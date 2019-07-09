import {Routes} from '@angular/router';
import {ApplicationResolver} from './application.resolver';
import {SettingsComponent} from './settings/settings.component';

export const settingsRoutes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		resolve: {
			application: ApplicationResolver
		}
	},
	{
		path: '**',
		redirectTo: ''
	}
];

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {NewsletterComponent} from "./analytics/newsletter.component";

export const newsletterRoutes: Routes = [
	{
		path: 'dashboard',
		component: NewsletterComponent
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(newsletterRoutes)
	]
})
export class NewsletterRoutingModule {
}

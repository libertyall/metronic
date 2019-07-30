import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsletterComponent} from "./analytics/newsletter.component";
import {NewsletterRoutingModule} from "./newsletter-routing.module";

@NgModule({
	declarations: [NewsletterComponent],
	imports: [
		NewsletterRoutingModule,
		CommonModule
	]
})
export class NewsletterModule {
}

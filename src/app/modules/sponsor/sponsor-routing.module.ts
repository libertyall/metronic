import {Routes} from '@angular/router';
import {SponsorListComponent} from "./sponsor-list/sponsor-list.component";
import {SponsorDetailComponent} from "./sponsor-detail/sponsor-detail.component";
import {SponsorResolver} from "./sponsor.resolver";
import {SponsorsComponent} from "./sponsors/sponsors.component";
import {SponsorFormComponent} from "./sponsor-form/sponsor-form.component";
import {CategoriesResolver} from "../category/categories.resolver";

export const sponsorRoutes: Routes = [
	{
		path: '',
		component: SponsorsComponent,
		children: [
			{
				path: 'list',
				component: SponsorListComponent,
			},
			{
				path: 'create',
				component: SponsorFormComponent,
				resolve: {
					sponsor: SponsorResolver,
					categories: CategoriesResolver
				}
			},
			{
				path: 'edit/:sponsorId',
				component: SponsorFormComponent,
				resolve: {
					sponsor: SponsorResolver,
					categories: CategoriesResolver
				}
			},
			{
				path: 'detail/:sponsorId',
				component: SponsorDetailComponent,
				resolve: {
					sponsor: SponsorResolver
				}
			},
			{
				path: '**',
				redirectTo: 'list'
			}
		]
	}
];

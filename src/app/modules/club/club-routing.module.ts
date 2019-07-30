import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {ClubsComponent} from "./clubs/clubs.component";
import {ClubFormComponent} from "./club-form/club-form.component";
import {ClubResolver} from "./club.resolver";

export const clubRoutes: Routes = [
	{
		path: '',
		component: ClubsComponent,
		resolve: {
			club: ClubResolver
		},
		children: [
			{
				path: '',
				component: ClubFormComponent
			},
			{
				path: '**',
				redirectTo: ''
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(clubRoutes)
	],
	exports: [
		RouterModule
	]
})
export class ClubRoutingModule {
}

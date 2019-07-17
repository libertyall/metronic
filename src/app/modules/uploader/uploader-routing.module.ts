import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploaderComponent } from './uploader/uploader.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryListComponent } from './galleries/gallery-list/gallery-list.component';
import { GalleryFormComponent } from './galleries/gallery-form/gallery-form.component';

export const uploaderRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'files',
		component: UploaderComponent
	},
	{
		path: 'galleries',
		component: GalleriesComponent,
		children: [
			{
				path: '',
				component: GalleryListComponent
			},
			{
				path: 'create',
				component: GalleryFormComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];

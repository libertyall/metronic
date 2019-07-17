import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadModule } from '../../shared/modules/upload/upload.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { uploaderRoutes } from './uploader-routing.module';
import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryListComponent } from './galleries/gallery-list/gallery-list.component';
import { GalleryFormComponent } from './galleries/gallery-form/gallery-form.component';

@NgModule({
	declarations: [
		UploaderComponent,
		DashboardComponent,
		GalleriesComponent,
		GalleryListComponent,
		GalleryFormComponent
	],
	imports: [
		CommonModule,
		UploadModule,
		RouterModule.forChild(uploaderRoutes)
	]
})
export class UploaderModule {
}

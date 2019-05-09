import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
	MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
	MatRadioModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaItemService } from '../../services/media/media-item.service';
import { NgPipesModule, OrderByPipe } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaAvatarComponent } from './media-avatar/media-avatar.component';
import { MemberService } from '../../services/member/member.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterModule } from '@angular/router';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		TranslateModule
		/* DialogModule,
		DragDropModule,
		MatExpansionModule,
		MatProgressBarModule,
		AngularFireFunctionsModule,
		AngularFireStorageModule,
		CommonModule,
		InlineEditModule,
		FlexLayoutModule,
		MatDialogModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		LoadingIndicatorModule,
		MatMenuModule,
		MatGridListModule,
		MatListModule,
		MatIconModule,
		MatProgressBarModule,
		MatRadioModule,
		MatSidenavModule,
		MatSelectModule,
		MatToolbarModule,
		MatListModule,
		MatTabsModule,
		NgPipesModule,
		PipesModule,
		ReactiveFormsModule,
		TranslateModule,
		SharedUserModule,
		RouterModule */
	],
	declarations: [
		MediaAvatarComponent,
		/* MediaCenterComponent,
		MediaGalleryFormComponent,
		MediaGalleryListComponent,
		MediaUploaderComponent,
		DropZoneDirective,
		FileSelectDirective,
		MediaItemInfoComponent,
		MediaGalleriesComponent,
		MediaGalleryFormAssignedObjectsComponent,
		MediaItemComponent,
		MediaItemsListModalComponent,
		StopPropagationDirective,
		MediaItemsListComponent,
		MediaShowItemComponent,
		MediaCenterSharedComponent,
		UnsplashLoaderComponent,
		UnsplashGalleryComponent,
		UnsplashItemComponent,
		UnsplashImageViewerComponent,
		UnsplashGalleryItemComponent */
	],
	exports: [
		// MediaItemsListComponent,
		MediaAvatarComponent,
		/* MediaCenterComponent,
		MediaGalleryFormComponent,
		MediaGalleryListComponent,
		MediaUploaderComponent,
		MediaCenterSharedComponent */
	],
	entryComponents: [
		/*  MediaGalleryListComponent,
		MediaItemInfoComponent,
		MediaItemsListModalComponent,
		MediaShowItemComponent,
		UnsplashImageViewerComponent */
	],
	providers: [
		/* OrderByPipe,
		ArticleService,
		ClubService,
		LocationService,
		MatchService,
		MemberService,
		SponsorService,
		SeasonService,
		TeamService,
		MediaDownloadService,
		MediaGalleryService,
		MediaUploaderService,
		MediaItemService,
		MediaItemsSelectionService,
		UnsplashService */
	]
})

export class SharedMediaModule {
}

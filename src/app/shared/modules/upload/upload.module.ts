import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { uploadReducer } from './_reducers/upload.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UploadEffects } from './_effects/upload.effects';
import { UploadService } from './services/upload.service';
import { MediaService } from './services/media.service';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
	declarations: [],
	imports: [
		AngularFireStorageModule,
		CommonModule,
		StoreModule.forFeature('uploadFile', uploadReducer),
		EffectsModule.forFeature([UploadEffects])
	],
	providers: [
		MediaService,
		UploadService
	]
})
export class UploadModule {
}

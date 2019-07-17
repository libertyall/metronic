import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploaderConfig } from '../../../shared/modules/upload/_model/uploader-config.class';
import { UploaderOptions } from '../../../shared/modules/upload/_model/uploader-options.class';
import { MediaService } from '../../../shared/modules/upload/services/media.service';
import { MediaItem } from '../../../shared/modules/upload/_model/media-item.class';

@Component({
	// tslint:disable-next-line:component-selector
  selector: 'uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent implements OnDestroy {

  private mediaItemSubscription: Subscription;
  public uploaderConfig: UploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
  };

  public uploaderOptions: UploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 25,
  };

  public mediaItems: MediaItem[];

  constructor(private mediaService: MediaService) {
    this.mediaItemSubscription = mediaService.mediaItems$.subscribe((mediaItems: MediaItem[]) => {
      this.mediaItems = mediaItems;
    });
  }

  ngOnDestroy(): void {
    this.mediaItemSubscription.unsubscribe();
  }

}

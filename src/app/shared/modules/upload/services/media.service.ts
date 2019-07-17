import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../../../core/auth/_services';
import { MediaItem } from '../_model/media-item.class';
import { FileType } from '../_model/file-type.class';

@Injectable()
export class MediaService {

	private collectionRef: AngularFirestoreCollection<MediaItem>;
	private path = `files`;
	public mediaItems$: Observable<MediaItem[]>;
	public defaultPlaceholder = '/assets/sfw/placeholder/no-image-found.jpg';

	constructor(private afs: AngularFirestore,
				private storage: AngularFireStorage,
				private authService: AuthService) {
		this.collectionRef = this.afs.collection<MediaItem>(this.path);
		this.mediaItems$ = this.collectionRef.valueChanges();
	}

	createMediaItem(mediaItem: MediaItem): Promise<void> {
		mediaItem.creation = {
			by: this.authService.getCreationBy(),
			at: this.authService.getCreationAt()
		};
		mediaItem.id = this.afs.createId();
		mediaItem.ordering = 0;
		return this.afs.collection(this.path).doc(mediaItem.id).set(mediaItem, { merge: true });
	}

	removeMediaItem(mediaItemId: string): Promise<void> {
		return this.afs.collection(this.path).doc(mediaItemId).delete();
	}

	getMediaItemById(mediaItemId: string): Observable<MediaItem> {
		return this.afs.collection(this.path).doc<MediaItem>(mediaItemId).valueChanges();
	}

	getMediaItemsById(mediaItemIds: string[]): Observable<MediaItem[]> {
		if (mediaItemIds.length === 0) {
			return of([]);
		}
		const items = [];
		mediaItemIds.forEach((mediaItemId) => {
			items.push(this.getMediaItemById(mediaItemId).pipe(
				take(1)
			));
		});
		return forkJoin(...items);
	}

	updateMediaItems(mediaItems: MediaItem[]): Promise<any> {
		const updates = [];
		for (let i = 0; i < mediaItems.length; i++) {
			mediaItems[i].ordering = i;
			updates.push(this.updateMediaItem(mediaItems[i]));
		}
		return of(updates).toPromise();
	}

	updateMediaItem(mediaItem: MediaItem): Promise<void> {
		return this.afs.collection(this.path).doc(mediaItem.id).update(mediaItem);
	}

	getMediaItems(assignedObjects: any[], itemId: string): Observable<MediaItem[]> {
		if (assignedObjects.length === 0 && !itemId) {
			return of([]);
		}
		return this.afs.collection<MediaItem>('files', ref => {
			if (!assignedObjects || assignedObjects.length === 0) {
				return ref
					.where('itemId', '==', itemId);
			} else {
				return ref
					.where('itemId', '==', itemId)
					.where('assignedObjects', '==', assignedObjects);
			}
		}).valueChanges();
	}

	getAssignedMedia(assignedObjects: any, itemId: string): Observable<MediaItem[]> {
		return this.getMediaItems(assignedObjects, itemId).pipe(
			map((mediaItems: MediaItem[]) => {
				return mediaItems;
			})
		);
	}

	getCurrentImage(assignedObjects: string[], itemId: string, placeholderImage?: string): Observable<MediaItem> {
		return this.getMediaItems(assignedObjects, itemId).pipe(
			map((mediaItems: MediaItem[]) => {
				let foundFile: MediaItem;
				mediaItems.forEach((mediaItem: MediaItem) => {
					if (FileType.getMimeClass(mediaItem.file) === 'image') {
						foundFile = mediaItem;
					}
				});
				// set default-Image
				return foundFile ? foundFile : this.getImagePlaceHolder(placeholderImage);
			})
		);
	}

	getImagePlaceHolder(placeholderImage: string): MediaItem {
		return {
			downloadURL: placeholderImage ? placeholderImage : (placeholderImage === '' ? '' : this.defaultPlaceholder)
		};
	}

	loadThumbnail(mediaItem: MediaItem, size: string): Observable<MediaItem> {
		console.log('ToDo - load Thumbnail');
		return of(null);
		/* if (mediaItem && mediaItem.thumbnailSizes) {
			const thumb = mediaItem.thumbnailSizes.find(item => {
				return item.name === size;
			});
			if (thumb) {
				const storageRef = this.storage.ref(thumb.link);
				if (storageRef && storageRef.getDownloadURL()) {
					return storageRef.getDownloadURL();
				}
			}
		}
		return of({ downloadURL: mediaItem.downloadURL }); */
	}

}

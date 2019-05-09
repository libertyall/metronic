import { IThumbnail } from './thumbnail.interface';

export class IMediaItem {

  id?: string;

  itemId?: string; // id from parent object
  assignedObjects?: {};
  downloadURL: string;

  ordering?: number;

  file?: {
    size?: number;
    type?: string;
    name?: string;
  };

  path?: string;

  description?: string;
  fileCredits?: string;
  isExternal?: boolean;

  creationAt?: any;
  creationBy?: string;

  thumbnailSizes?: IThumbnail[];
}

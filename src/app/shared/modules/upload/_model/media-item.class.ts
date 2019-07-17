import { Creation } from '../../../_models/creation.class';

export class MediaItem {

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

  creation?: Creation;

  // thumbnailSizes?: IThumbnail[];
}

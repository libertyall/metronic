import { Creation } from '../../../_models/creation.class';
import {BaseModel} from "../../../../core/_base/crud";

export class MediaItem extends BaseModel {

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

import { FilterFunction } from '../services/upload.service';

export class UploaderOptions {

  allowedMimeType?: Array<string>;
  allowedFileType?: Array<string>;
  filters?: Array<FilterFunction>;
  assignedObjects?: string[];
  itemId: string;
  maxFileSize?: number;
  queueLimit?: number;
  queueSize?: number;

}

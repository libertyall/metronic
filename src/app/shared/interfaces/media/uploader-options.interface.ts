import { Upload } from '../../classes/upload.class';

export interface IUploaderOptions {
	allowedMimeType?: Array<string>;
	allowedFileType?: Array<string>;
	filters?: Array<FilterFunction>;
	assignedObjects?: string[];
	itemId: string;
	maxFileSize?: number;
	queueLimit?: number;
	queueSize?: number;
}

export interface FilterFunction {
	name: string;
	fn: (upload?: Upload, options?: IUploaderOptions) => boolean;
}

import { BaseModel } from '../../../core/_base/crud';

export class ExternalLinkModel extends BaseModel {
	target: string;
	link: string;
	isEnabled: boolean;
}

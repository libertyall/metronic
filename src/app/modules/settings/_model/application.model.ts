import { BaseModel } from '../../../core/_base/crud';
import {Calendar} from "./calendar.model";
import {MailList} from "./mail-list.class";
import {Link} from "./link.model";

export class Application extends BaseModel {

	assignedCalendars?: Calendar[];

	isCurrentApplication: boolean;

	page: {
		name: string;
		title?: string;
		subTitle?: string;
		description?: string;
		email?: string;
		assignedKeywords?: string;
	};

	urlShortening: {
		title: string,
		key: string
	} | number;

	registration: string;

	downtime: {
		isEnabled: boolean;
		message?: string;
	};

	mailing?: MailList[];

	links?: Link[];
}

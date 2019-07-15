import { BaseModel } from '../../../core/_base/crud';

export class ApplicationModel extends BaseModel {
	// id?: string;

	// assignedCalendars?: IGoogleCalendar[];

	isCurrentApplication: boolean;

	page: {
		isEnabled: boolean;
		name: string;
		title?: string;
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

	// mailing?: IMailList[];

	// staticPages?: IStaticPage[];
	// social?: ISocialPage[];
	// socialNetworks?: ISocialNetwork[];

	// signInProviders?: {
	// 	title: string,
	// 	isEnabled: boolean
	// }[];

	// configuration?: {
	// 	backend: BackendLayoutConfigModel,
	// 	frontend: any
	// };
}

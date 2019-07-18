import { BaseModel } from '../../../core/_base/crud';

export class ApplicationModel extends BaseModel {
	// id?: string;

	// assignedCalendars?: IGoogleCalendar[];

	isCurrentApplication: boolean;

	page: {
		isEnabled: boolean;
		// name: string;
		title?: string;
		description?: string;
		email?: string;
		assignedKeywords?: string;
	};

	urlShortening: {
		title: string,
		key: string
	} | number;

	registration: {
		isEnabled: boolean;
		defaultRole: string;
	};

	downtime: {
		isEnabled: boolean;
		message?: string;
	};

	// mailing?: IMailList[];

	// social?: ISocialPage[];
	// socialNetworks?: ISocialNetwork[];

	// configuration?: {
	// 	backend: BackendLayoutConfigModel,
	// 	frontend: any
	// };
}

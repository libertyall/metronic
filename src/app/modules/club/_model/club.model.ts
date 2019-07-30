import {BaseModel} from "../../../core/_base/crud";
import {ClubHonorary} from "./club-honorary.class";
import { ClubManagement } from './club-management.class';

export class Club extends BaseModel {

	description?: string;
	history?: string;
	logoURL?: string;
	// address?: IAddress;

	fussballDeClubId?: string;
	fussballDeClubUrl?: string;

	assignedLocations?: {
		id: string;
		title: string;
	}[];

	// timeLine?: ITimeLineEvent[];

	founding?: string;
	clubColours?: string;
	assignedContact?: string;
	homepage?: string;

	honoraries?: ClubHonorary[];

	photoDescription?: string;
	positions?: ClubManagement[];
}

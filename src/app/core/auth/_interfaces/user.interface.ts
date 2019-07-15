import { BaseModel } from '../../_base/crud';

export class UserInterface extends BaseModel {

	emailVerified?: boolean;
	isDisabled?: boolean;

	email: string;
	password?: string;

	firstName?: string;
	lastName?: string;
	displayName?: string;
	// gender?: string;
	phoneNumber?: string;
	photoUrl?: string;

	assignedRoles?: [];
	lastSignInTime?: any;
	creationTime?: any;

	// isNewUser?: boolean;
	// isOnline?: boolean;

	// address?: Address;
	// socialNetworks?: SocialNetworks;

	providerId?: string;
}

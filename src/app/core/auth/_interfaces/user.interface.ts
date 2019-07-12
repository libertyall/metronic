import { BaseInterface } from '../../_base/crud';
import { Address } from './address.interface';
import { SocialNetworks } from './social-networks.interface';

export interface UserInterface extends BaseInterface {

	uid?: string;
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

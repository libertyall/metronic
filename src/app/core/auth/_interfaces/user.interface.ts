import { BaseModel } from '../../_base/crud';
import { Address } from './address.interface';
import { SocialNetworks } from './social-networks.interface';
import { Role } from './role.interface';

export interface IUser extends BaseModel {
	id?: string;
	emailVerified?: boolean;
	isDisabled?: boolean;

	email: string;
	password?: string;

	firstName?: string;
	lastName?: string;
	displayName?: string;
	gender?: string;

	assignedRoles?: Role[];
	lastSignInTime?: any;

	address?: Address;
	socialNetworks?: SocialNetworks;
}

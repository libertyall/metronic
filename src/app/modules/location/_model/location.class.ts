import { BaseModel } from '../../../core/_base/crud';
import { Address } from '../../../core/auth/_interfaces/address.interface';
import { Creation } from '../../../shared/_models/creation.class';

export class Location extends BaseModel{

  text?: string;

  assignedCategory?: {
  	id: string;
  	title: string;
  };
  // assignedContacts?: ILocationContact[];

  fupaLink?: string;
  opening?: string;
  prices?: string;

  address?: Address;
}

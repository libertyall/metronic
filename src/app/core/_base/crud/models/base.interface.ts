import { CreationInterface } from '../../../../shared/interfaces/creation.interface';
import { PublicationInterface } from '../../../../shared/interfaces/publication.interface';
import { ModificationInterface } from '../../../../shared/interfaces/modification.interface';

export interface BaseInterface {
	creation?: CreationInterface;
	publication?: PublicationInterface;
	modification?: ModificationInterface[];
	isImported?: boolean;
	title?: string;
	id?: string;
}

import { CreationInterface } from '../../../../shared/interfaces/creation.interface';
import { PublicationInterface } from '../../../../shared/interfaces/publication.interface';
import { ModificationInterface } from '../../../../shared/interfaces/modification.interface';
import { Key } from '@briebug/ngrx-auto-entity';

export class BaseModel {
	creation?: CreationInterface;
	publication?: PublicationInterface;
	modification?: ModificationInterface[];
	isImported?: boolean;
	title?: string;
	@Key id?: string;
}

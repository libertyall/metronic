import { Creation } from '../../../../shared/_models/creation.class';
import { Publication } from '../../../../shared/_models/publication.class';
import { Modification } from '../../../../shared/_models/modification.class';

export class BaseModel {
	creation?: Creation;
	publication?: Publication;
	modification?: Modification[];
	isImported?: boolean;
	title?: string;
	id?: string;
}

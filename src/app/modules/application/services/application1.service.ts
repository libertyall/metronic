import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ApplicationInterface } from '../_interfaces/application.interface';

@Injectable({ providedIn: 'root' })
export class ApplicationService extends EntityCollectionServiceBase<ApplicationInterface> {

	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
		super('Application', serviceElementsFactory);
	}

}

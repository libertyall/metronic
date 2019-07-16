import {DefaultPersistenceResultHandler, EntityAction, EntityActionFactory, EntityOp, Logger} from '@ngrx/data';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class FirestorePersistenceResultHandler extends DefaultPersistenceResultHandler {

	constructor(logger: Logger,
				private _entityActionFactory: EntityActionFactory) {
		super(logger, _entityActionFactory);
	}

	handleSuccess(originalAction: EntityAction): (data: any) => Action {
		console.log('Entity Action', originalAction);
		return (data: any) => {
			switch (data.type) {

				case 'added': {
					console.log(originalAction.payload.entityName);
					return this._entityActionFactory.create(
						originalAction.payload.entityName,
						EntityOp.ADD_ONE,
						{id: data.doc.id, ...(<object>data.doc.data())}
					);
				}

				case 'removed': {
					return this._entityActionFactory.create(
						originalAction.payload.entityName,
						EntityOp.REMOVE_ONE,
						data.doc.id
					);
				}

				case 'modified': {
					return this._entityActionFactory.create(
						originalAction.payload.entityName,
						EntityOp.UPDATE_ONE,
						{id: data.doc.id, changes: {id: data.doc.id, ...(<object>data.doc.data())}}
					);
				}

				default:
					console.log(data.type);
					return super.handleSuccess(originalAction)(data);
			}

		};
	}
}

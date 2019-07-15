import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, } from '../../app.state';
import { ApplicationFacadeBase } from './application.state';
import { ApplicationModel } from './model/application.model';

@Injectable({
	providedIn: 'root'
})
export class ApplicationFacade extends ApplicationFacadeBase {
	constructor(store: Store<AppState>) {
		super(ApplicationModel, store);
	}

	// TODO: Extend your facade's functionaltiy here!
}

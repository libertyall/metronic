import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, } from '../../app.state';
import { CategoryFacadeBase } from './category.state';
import { CategoryModel } from './model/category.model';


@Injectable({
	providedIn: 'root'
})
export class CategoryFacade extends CategoryFacadeBase {
	constructor(store: Store<AppState>) {
		super(CategoryModel, store);
	}

	// TODO: Extend your facade's functionaltiy here!
}

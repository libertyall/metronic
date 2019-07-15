import {Params, RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';

export interface IRouterStateUrl {
	url: string;
	queryParams: Params;
	event: any;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<IRouterStateUrl> {

	serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
		const {url} = routerState;
		const queryParams = routerState.root.queryParams;
		const event =  routerState.root;
		console.log(routerState);
		return {url, queryParams, event };
	}

}

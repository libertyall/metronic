import { ProvidersManagementActions, ProvidersManagementActionTypes } from '../_actions/providers.management.actions';

export interface State {
	loading: boolean;
	success: boolean;
	providers: {
		facebook: boolean;
		google: boolean;
		phone: boolean;
		password: boolean;
	};
	error: {
		code: string;
		message: string
	};
}

const initialState = {
	loading: false,
	success: false,
	providers: {
		facebook: false,
		google: false,
		phone: false,
		password: false
	},
	error: null
} as State;

export function reducer(state = initialState, action: ProvidersManagementActions): State {
	switch (action.type) {

		case ProvidersManagementActionTypes.SetProviders:
			return {...state, providers: {...state.providers, ...action.payload}};

		case ProvidersManagementActionTypes.LinkCredentialAccount:
		case ProvidersManagementActionTypes.LinkFacebookAccount:
		case ProvidersManagementActionTypes.LinkGoogleAccount:
		case ProvidersManagementActionTypes.UnlinkCredentialAccount:
		case ProvidersManagementActionTypes.UnlinkGoogleAccount:
		case ProvidersManagementActionTypes.UnlinkFacebookAccount:
			return {...state, success: false, error: null, loading: true};

		case  ProvidersManagementActionTypes.LinkSuccess:
			return {...state, providers: {...state.providers, [action.payload.provider]: true}, success: true, error: null, loading: false};

		case  ProvidersManagementActionTypes.UnlinkSuccess:
			return {...state, providers: {...state.providers, [action.payload.provider]: false}, success: true, error: null, loading: false};

		case  ProvidersManagementActionTypes.LinkError:
		case  ProvidersManagementActionTypes.UnlinkError:
			return {...state, success: false, error: action.payload, loading: false};

		default:
			return state;
	}
}

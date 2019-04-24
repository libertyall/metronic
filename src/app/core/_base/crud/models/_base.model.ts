export interface BaseModel {
	id?: string;

	creationAt?: any;
	creationBy?: string;

	modifications?: {
		by: string;
		at: any;
	}[];
}

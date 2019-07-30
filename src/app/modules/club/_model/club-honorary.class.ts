import {BaseModel} from "../../../core/_base/crud";

export class ClubHonorary extends BaseModel{
  assignedArticle?: {
	  id: string;
	  title: string;
  };
  assignedMember?: {
  	id: string;
  	firstName: string;
  	lastName: string;
  };
  startDate: {
    nanoseconds: number;
    seconds: number;
  };
}

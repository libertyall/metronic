import { ILocation } from './location/location.interface';
import { ITeam } from './team/team.interface';
import { ICategory } from './category.interface';

export interface IArticle {

  id?: string;
  title: string;
  subTitle?: string;
  excerpt?: string;

  postImage?: string;
  postURL?: string;

  text?: string;

  articleDate?: any;

  creationAt: any;
  creationBy: string;

  publicationAt: any;
  publicationStatus: number;
  publicationBy: string;

  assignedCategories?: ICategory[];

  assignedTags?: {
    display: string;
    value: string;
  }[];
  assignedLocation?: ILocation;
  assignedTeams?: ITeam[];

  soccerWatchLink?: string;
  assignedMatches?: string[];

  isFeaturedPost?: boolean;
  isStaticPage?: boolean;
  displayInFooter?: boolean;

  meta?: {
    main?: {
      description: string;
      title: string;
      scheduled: boolean;
    },
    facebook?: {
      description: string;
      title: string;
      scheduled: boolean;
    },
    twitter?: {
      description: string;
      title: string;
      scheduled: boolean;
    }
  };

}

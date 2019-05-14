import { EntityMetadataMap } from 'ngrx-data';

const entityMetadata: EntityMetadataMap = {
  application: {},
  article: {},
  category: {},
  club: {},
  file: {},
  gallery: {},
  location: {},
  match: {},
  memberOfTheWeek: {},
  member: {},
  report: {},
  season: {},
  sponsor: {},
  teamOfTheMonth: {},
  team: {},
  user: {}
};

const pluralNames = {
  category: 'categories',
  gallery: 'galleries',
  match: 'matches'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};

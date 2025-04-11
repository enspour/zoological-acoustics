import { ProjectDataValue } from './project-data-value.interface';

export interface Project {
  uuid: string;
  name: string;
  createdByUuid: string;
  createdAt: string;
}

export type ProjectWithDataValues = Project & {
  dvs: ProjectDataValue[];
};

export type CreatableProject = Omit<
  Project,
  'uuid' | 'createdByUuid' | 'createdAt'
>;

export type UpdatableProject = Omit<Project, 'createdByUuid' | 'createdAt'>;

import { ProjectDataValue } from './project-data-value.interface';

export interface Project {
  uuid: string;
  name: string;
}

export type ProjectWithDataValues = Project & {
  dvs: ProjectDataValue[];
};

export type CreatableProject = Omit<Project, 'uuid'>;
export type UpdatableProject = Project;

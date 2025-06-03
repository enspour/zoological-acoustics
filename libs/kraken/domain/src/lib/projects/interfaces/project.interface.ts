import { ProjectDataValue } from './project-data-value.interface';
import { ProjectMember } from './project-member.interface';

export interface Project {
  uuid: string;
  name: string;
  createdByUuid: string;
  createdAt: string;
}

export type ProjectWithDataValues = Project & {
  dataValues: ProjectDataValue[];
};

export type ProjectWithMembers = Project & {
  members: ProjectMember[];
};

export type CreatableProject = Omit<
  Project,
  'uuid' | 'createdByUuid' | 'createdAt'
>;

export type UpdatableProject = Omit<Project, 'createdByUuid' | 'createdAt'>;

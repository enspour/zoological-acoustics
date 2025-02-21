export interface Project {
  uuid: string;
  name: string;
}

export type CreatableProject = Omit<Project, 'uuid'>;
export type UpdatableProject = Project;

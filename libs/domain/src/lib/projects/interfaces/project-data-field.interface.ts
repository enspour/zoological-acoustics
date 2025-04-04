import { ProjectDataValue } from './project-data-value.interface';

export enum ProjectDataFieldType {
  number = 'number',
  string = 'string',
  select = 'select',
}

export interface ProjectDataField {
  uuid: string;
  name: string;
  type: ProjectDataFieldType;
}

export type ProjectDataFieldWithValues = ProjectDataField & {
  values: ProjectDataValue[];
};

export type CreatableProjectDataField = Omit<ProjectDataField, 'uuid'>;
export type UpdatableProjectDataField = ProjectDataField;

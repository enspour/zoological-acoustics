import { ProjectDataField } from './project-data-field.interface';

export interface ProjectDataValue {
  uuid: string;
  value: string;
  fieldUuid: string;
}

export type ProjectDataValueWithField = ProjectDataValue & {
  field: ProjectDataField;
};

export type CreatableProjectDataValue = Omit<ProjectDataValue, 'uuid'>;
export type UpdatableProjectDataValue = ProjectDataValue;

export interface User {
  uuid: string;
  name: string;
}

export type CreatableUser = Omit<User, 'uuid'>;
export type UpdatableUser = User;

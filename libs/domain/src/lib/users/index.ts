export interface User {
  uuid: string;
  name: string;
}

export type CreatableUser = Omit<User, 'uuid'>;
export type UpdatableUser = User;

export interface UserCredentials {
  uuid: string;
  username: string;
  hashedPassword: string;
  userUuid: string;
}

export type CreatableUserCredentials = Omit<
  UserCredentials,
  'uuid' | 'userUuid'
>;

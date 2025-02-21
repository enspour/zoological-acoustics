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

export interface KongUser {
  uuid: string;
  name: string;
}

export type KongCreatableUser = Omit<KongUser, 'uuid'>;
export type KongUpdatableUser = KongUser;

import { User } from '@octo/domain';

export interface GetUserResponseDto {
  statusCode: number;
  data: { user: User };
}

import { User } from '@kudu/domain';

export interface GetUserResponseDto {
  statusCode: number;
  data: { user: User };
}

import { User } from '@kraken/domain';

export interface GetUserResponseDto {
  statusCode: number;
  data: { user: User };
}

import { ProjectMember } from '@kraken/domain';

export interface GetProjectMembersResponseDto {
  statusCode: number;
  data: { members: ProjectMember[] };
}

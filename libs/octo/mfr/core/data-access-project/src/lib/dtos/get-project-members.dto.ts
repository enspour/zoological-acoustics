import { ProjectMember } from '@octo/domain';

export interface GetProjectMembersResponseDto {
  statusCode: number;
  data: { members: ProjectMember[] };
}

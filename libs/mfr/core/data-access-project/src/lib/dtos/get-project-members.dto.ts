import { ProjectMember } from '@kudu/domain';

export interface GetProjectMembersResponseDto {
  statusCode: number;
  data: { members: ProjectMember[] };
}

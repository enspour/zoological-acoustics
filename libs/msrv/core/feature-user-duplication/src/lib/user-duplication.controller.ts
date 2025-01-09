import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { User } from '@kudu/domain';

import { UserDuplicationService } from './user-duplication.service';

@Controller()
export class UserDuplicationController {
  constructor(private userDuplicationService: UserDuplicationService) {}

  @EventPattern('user.created')
  public async onUserCreated(@Payload() payload: { user: User }) {
    await this.userDuplicationService.create(payload.user);
  }

  @EventPattern('user.updated')
  public async onUserUpdated(@Payload() payload: { user: User }) {
    await this.userDuplicationService.update(payload.user);
  }

  @EventPattern('user.removed')
  public async onUserRemoved(@Payload() payload: { user: User }) {
    await this.userDuplicationService.remove(payload.user);
  }
}

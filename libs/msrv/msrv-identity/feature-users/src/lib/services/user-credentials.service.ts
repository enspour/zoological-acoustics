import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserCredentialsEntity } from '../entity';

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectRepository(UserCredentialsEntity)
    private repository: Repository<UserCredentialsEntity>,
  ) {}

  public async getByUsername(username: string) {
    return await this.repository.findOne({
      where: { username },
      relations: { user: true },
    });
  }
}

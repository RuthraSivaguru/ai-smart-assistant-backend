import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const data = await this.repo.findOne({
      where: { id: userId },
      select: [
        'id',
        'name',
        'email',
        'address',
        'phoneNumber',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!data) {
      throw new Error('User not found');
    }
    return data;
  }

  async updateProfile(userId: string, body: any) {
    const data = await this.repo.update(userId, body);
    if (!data) {
      throw new Error('User not found');
    }
    return data;
  }
}

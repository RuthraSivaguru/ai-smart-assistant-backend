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
    if (!userId) {
      throw new Error('User ID is required for updating profile');
    }
    const data = await this.repo.update(userId, {
      ...body,
      updatedAt: new Date(),
    });
    if (!data) {
      throw new Error('User not found');
    }
    const updatedData = await this.getProfile(userId);
    return { message: 'Profile updated successfully', updatedData };
  }
}

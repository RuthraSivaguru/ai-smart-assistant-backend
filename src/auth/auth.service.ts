import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: {
    name: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
  }) {
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.usersRepo.save({
      name: dto.name,
      email: dto.email,
      password: hashed,
      address: dto.address,
      phoneNumber: dto.phoneNumber,
    });

    const { password: _, ...result } = user;
    return result;
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.usersRepo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async getAllUsers() {
    const data = await this.usersRepo.find({
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
    console.log(data);
    return {
      message: 'All Users Fetch Successfully',
      data,
    };
  }

  async deleteUser(id: string) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.usersRepo.delete({ id });
    return {
      message: 'User deleted successfully',
    };
  }
}

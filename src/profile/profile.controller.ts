import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import type { ProfileUpdate } from './schemas/profile-create.shema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { profileUpdateSchema } from './schemas/profile-create.shema';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: any) {
    return this.profileService.getProfile(req.user.userId);
  }

  @Put('update')
  async updateProfile(
    @Req() req,
    @Body(new ZodValidationPipe(profileUpdateSchema)) body: ProfileUpdate,
  ) {
    return this.profileService.updateProfile(req.user.userId, body);
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { RegisterSchema } from './schemas/register.schema';
import { LoginSchema } from './schemas/login.schema';
import type { RegisterDto } from './schemas/register.schema';
import type { LoginDto } from './schemas/login.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body(new ZodValidationPipe(RegisterSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body(new ZodValidationPipe(LoginSchema)) body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('all-users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}

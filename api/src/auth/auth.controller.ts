import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserSigninDto } from './dto/signin.dto';
import { LocalAuthGuard } from '@/passport/local-auth.guard';
import { JwtAuthGuard } from '@/passport/jwt-auth.guard';
import { Public, ResponseMessage } from '@/decorators/metadata';
import { UsersService } from '@/modules/users/users.service';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentications')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @Public()
  @ResponseMessage('Sign in successfully')
  @ApiBody({ type: UserSigninDto })
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}

import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserSigninDto } from './dto/signin.dto';
import { LocalAuthGuard } from '@/passport/local-auth.guard';
import { JwtAuthGuard } from '@/passport/jwt-auth.guard';

@ApiTags('Authentications')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signin')
  // async signIn(@Body() createAuthDto: CreateAuthDto) {
  //   return await this.authService.signIn(createAuthDto.email, createAuthDto.password);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: UserSigninDto })
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return null;
    }
    return user;
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }

  // Old code
  // async signIn(email: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }
  //   const isPasswordMatch = await comparePassword(password, user.password);
  //   if (!isPasswordMatch) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const payload = { email: user.email, sub: user._id };

  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}

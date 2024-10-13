import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/utils';
import { JwtService } from '@nestjs/jwt';

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

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

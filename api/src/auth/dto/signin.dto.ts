import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSigninDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'hello@example.com', description: 'Email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    description: 'Password',
  })
  readonly password: string;
}

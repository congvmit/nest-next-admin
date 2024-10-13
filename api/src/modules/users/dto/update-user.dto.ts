import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserParamsDto {
  @IsMongoId({ message: 'Invalid ID' })
  @IsNotEmpty({ message: 'ID is required' })
  id: string;
}

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}

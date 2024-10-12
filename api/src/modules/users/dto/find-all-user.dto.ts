import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty()
  currentPage: number;

  @IsNotEmpty()
  pageSize: number;
}

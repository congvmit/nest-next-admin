import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class DeleteUserParamsDto {
  @IsMongoId({ message: 'Invalid ID' })
  @IsNotEmpty({ message: 'ID is required' })
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ValidationMessages } from 'src/shared/validation/validation.messages';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @IsEmail({}, { message: ValidationMessages.IS_EMAIL })
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  lastName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @IsStrongPassword({}, { message: ValidationMessages.IS_STRONG_PASSWORD })
  password: string;
}

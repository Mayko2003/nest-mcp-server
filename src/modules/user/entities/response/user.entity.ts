import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../database/user.entity';

export class UserEntityResponse {
  @ApiProperty({
    description: 'The id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    type: String,
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'The status of the user',
    example: UserStatus.ACTIVE,
    enum: UserStatus,
  })
  status: UserStatus;
}

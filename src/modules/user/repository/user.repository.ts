import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntityDB } from '../entities/database/user.entity';

export interface UserRepositoryInterface {
  checkIfEmailExists(email: string): Promise<boolean>;
  checkIfUsernameExists(username: string): Promise<boolean>;
  checkIfUserExistById(id: string): Promise<boolean>;
  create(createUserDto: CreateUserDto, salt: string): Promise<UserEntityDB>;
  findByEmail(email: string): Promise<UserEntityDB | null>;
  findByUsername(username: string): Promise<UserEntityDB | null>;
  findById(id: string): Promise<UserEntityDB | null>;
  findAll(): Promise<UserEntityDB[]>;
  filter(filter: any): Promise<UserEntityDB[]>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntityDB>;
  delete(id: string): Promise<UserEntityDB>;
}

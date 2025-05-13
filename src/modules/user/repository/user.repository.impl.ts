import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from './user.repository';
import { UserEntityDB, UserStatus } from '../entities/database/user.entity';
import { DATABASE_PROVIDER_NAME } from 'src/shared/constants/providers';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntityDB, DATABASE_PROVIDER_NAME)
    private readonly userRepository: Repository<UserEntityDB>,
  ) {}

  async checkIfEmailExists(email: string): Promise<boolean> {
    const count = await this.userRepository.countBy({
      email,
    });

    return !!count;
  }
  async checkIfUsernameExists(username: string): Promise<boolean> {
    const count = await this.userRepository.countBy({ username });

    return !!count;
  }
  async checkIfUserExistById(id: string): Promise<boolean> {
    const count = await this.userRepository.countBy({
      id,
      status: UserStatus.ACTIVE,
    });

    return !!count;
  }

  create(createUserDto: CreateUserDto, salt: string): Promise<UserEntityDB> {
    const user = this.userRepository.create({
      ...createUserDto,
      salt,
    });
    return this.userRepository.save(user);
  }
  findByEmail(email: string): Promise<UserEntityDB | null> {
    return this.userRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
    });
  }
  findByUsername(username: string): Promise<UserEntityDB | null> {
    return this.userRepository.findOne({
      where: { username, status: UserStatus.ACTIVE },
    });
  }
  async findById(id: string): Promise<UserEntityDB | null> {
    return this.userRepository.findOne({
      where: { id, status: UserStatus.ACTIVE },
    });
  }
  findAll(): Promise<UserEntityDB[]> {
    return this.userRepository.find({ where: { status: UserStatus.ACTIVE } });
  }
  filter(filter: any): Promise<UserEntityDB[]> {
    console.log(filter);
    return this.userRepository.find({
      where: { status: UserStatus.ACTIVE },
    });
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntityDB> {
    const user = await this.userRepository.findOne({
      where: { id, status: UserStatus.ACTIVE },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.userRepository.save({ ...user, ...updateUserDto });
  }
  async delete(id: string): Promise<UserEntityDB> {
    const user = await this.userRepository.findOne({
      where: { id, status: UserStatus.ACTIVE },
    });
    if (!user) throw new NotFoundException('User not found');
    user.status = UserStatus.INACTIVE;
    return this.userRepository.save(user);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository.impl';
import { randomString } from 'src/shared/utils/random-string.util';
import { createHash } from 'crypto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    // check if email exists
    const emailExists = await this.userRepository.checkIfEmailExists(email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // check if username exists
    const usernameExists =
      await this.userRepository.checkIfUsernameExists(username);
    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }

    // generate salt
    const salt = randomString(10);
    const saltHash = createHash('sha512').update(salt).digest('hex');
    // generate password
    const password = `${saltHash}${createUserDto.password}`;
    // hash password
    const hashPassword = createHash('sha512').update(password).digest('hex');
    return this.userRepository.create(
      {
        ...createUserDto,
        password: hashPassword,
      },
      salt,
    );
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, username } = updateUserDto;
    if (email) {
      const emailExists = await this.userRepository.checkIfEmailExists(email);
      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }
    }
    if (username) {
      const usernameExists =
        await this.userRepository.checkIfUsernameExists(username);
      if (usernameExists) {
        throw new BadRequestException('Username already exists');
      }
    }
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}

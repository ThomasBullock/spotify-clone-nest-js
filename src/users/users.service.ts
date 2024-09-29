import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, //1.
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt(); // 2.
    userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
    const user = await this.userRepository.save(userDTO); // 4.
    delete user.password; // 5.
    return user; // 6.
  }
}

// 1. We have imported the User Entity imports: [TypeOrmModule.forFeature([User])],
// in the UsersModule now we can inject the UsersRepository inside the UsersService.

// 2. We have created the salt number to encrypt the password

// 3. We have encrypted the password and set it to userDTO password property

// 4. You have to save the user by calling the save method from the repository

// 5. You don't need to send the user password in the response. You have to delete the user
// password from the user object

// 6. Finally we need to return the user in the response

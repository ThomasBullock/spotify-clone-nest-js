import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO); // 1.
    const passwordMatched = await bcrypt.compare(
      // 2.
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      // 3.
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}

// 1. We have to find the user based on email. We need to get the email and password from the request body.
// 2. We will compare the user password with an encrypted password that we saved in the last video
// 3. If the password matches then delete the user password and send the user back in the response. It means the user has logged in successfully

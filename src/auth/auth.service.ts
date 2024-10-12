import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO); // 1.
    const passwordMatched = await bcrypt.compare(
      // 2.
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      // 3.
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      // find if it is an artist then the add the artist id to payload
      const artist = await this.artistsService.findArtist(user.id); // 4
      if (artist) {
        // 5
        payload.artistId = artist.id;
      }
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}

// 1. We have to find the user based on email. We need to get the email and password from the request body.
// 2. We will compare the user password with an encrypted password that we saved in the last video
// 3. If the password matches then delete the user password and send the user back in the response. It means the user has logged in successfully
// 4. Find the artist based on the logged-in user.
// 5. If the user is an artist, save the artist ID in the payload; this artist ID will be used when
// decoding the token in the ArtistGuard.

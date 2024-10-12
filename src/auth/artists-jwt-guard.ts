import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// Each role can be associated with a distinct guard function that validates whether a user has the appropriate permissions to access a resource.
// This is an application of the "Single Responsibility Principle," as each guard function focuses solely on authorizing a specific role,
// making the code easier to manage and extend.

@Injectable()
export class ArtistJwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    // 1
    if (err || !user) {
      // 2
      throw err || new UnauthorizedException();
    }
    console.log(user);
    if (user.artistId) {
      // 3
      return user;
    }
    throw err || new UnauthorizedException();
  }
}

// 1. When you apply the JwtAuthGuard at the controller function it will call the handleRequest function
// 2. If there is an error or no user then it will send the unauthorized error
// 3. Here we are checking the user role, if it is an artist then we have to return the user. This user
// will have have email, userId, and artistId property

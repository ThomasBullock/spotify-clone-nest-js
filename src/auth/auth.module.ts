import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // 1.
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

// We are exporting the AuthService from AuthModule
// which means when we import the AuthModule into another module
// you can use the AuthService or inject the authservice into your imported module.

// 1. Missing this import caused this error
// Potential solutions:
// - Is AuthModule a valid NestJS module?
// - If UsersService is a provider, is it part of the current AuthModule?
// - If UsersService is exported from a separate @Module, is that module imported within AuthModule?
//   @Module({
//     imports: [ /* the Module containing UsersService */ ]
//   })

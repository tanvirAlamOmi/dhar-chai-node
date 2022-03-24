import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  // imports: [AuthService],
  imports: [
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
  
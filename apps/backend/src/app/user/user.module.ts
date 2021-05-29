import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '@interfaces/user';
import { UserService } from './user.service';
import { UserGateway } from './user.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UserService, UserGateway],
  exports: [UserService],
})
export class UserModule {}

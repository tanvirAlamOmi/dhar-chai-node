import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './model/services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './model/users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGueard } from './common/guards/roles/roles.guard';

@Module({
  imports: [
    // Third party module
    ConfigModule.forRoot({
      // cache:true,
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://lazarus:2441139@dhar-chai.fg0kz.mongodb.net/dhar-chai?authSource=admin&replicaSet=atlas-83s00b-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'),
    
    // App module
    ServicesModule,
    
    UsersModule,
    
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGueard,
    },
  ],
})
export class AppModule {}

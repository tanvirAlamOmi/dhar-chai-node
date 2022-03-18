import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Third party module
    ConfigModule.forRoot({cache:true}),
    MongooseModule.forRoot('mongodb+srv://lazarus:2441139@dhar-chai.fg0kz.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-83s00b-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'),
    
    // App module
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

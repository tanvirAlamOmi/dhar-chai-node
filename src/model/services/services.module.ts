import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Service, ServiceSchema } from './schemas';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name:Service.name, schema: ServiceSchema }])
  ],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}

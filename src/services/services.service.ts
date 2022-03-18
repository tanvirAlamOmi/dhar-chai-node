import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { Model } from 'mongoose'
import { ServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
    constructor(@InjectModel(Service.name) private readonly model: Model<ServiceDocument>)
    {}


    async findAll(): Promise<Service[]> {
        return await this.model.find().exec(); 
    }

    async findOne(id: string): Promise<Service> {
        return await this.model.findById(id).exec();
    }

    async create(serviceDto: ServiceDto): Promise<Service> {
        return await new this.model({
          ...serviceDto,
          createdAt: new Date(),
        }).save();
    }

    async update(id: string, serviceDto: ServiceDto): Promise<ServiceDto> {
        return await this.model.findByIdAndUpdate(id, serviceDto).exec();
    }

    async delete(id: string): Promise<ServiceDto> {
        return await this.model.findByIdAndDelete(id).exec();
    }

}

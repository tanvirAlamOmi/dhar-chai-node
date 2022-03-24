import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './entities/service.entity';
import { Model } from 'mongoose'
import { ServiceDto } from './dto';

@Injectable()
export class ServicesService {
    constructor(@InjectModel(Service.name) private readonly model: Model<ServiceDocument>)
    {}


    async findAll(): Promise<Service[]> {
        return await this.model.find().exec(); 
    }

    async findOne(id: string): Promise<Service> {
        let service = await this.model.findById(id).exec();
        if(!service) throw new NotFoundException('could not find the service.')
        return service;
    }

    async create(serviceDto: ServiceDto): Promise<Service> {
        return await new this.model({
          ...serviceDto,
          createdAt: new Date(),
        }).save();
    }

    async update(id: string, serviceDto: ServiceDto): Promise<ServiceDto> {
        let service = await this.model.findByIdAndUpdate(id, serviceDto).exec();
        if(!service) throw new NotFoundException('could not find the service.')
        return service;
    }

    
    async replace(id: string, serviceDto: ServiceDto): Promise<ServiceDto> {
        let service = await this.model.findOneAndReplace({id}, serviceDto).exec();
        if(!service) throw new NotFoundException('could not find the service.')
        return service;
    }

    async delete(id: string): Promise<ServiceDto> {
        let service = await this.model.findByIdAndDelete(id).exec();
        if(!service) throw new NotFoundException('could not find the service.')
        return service;
    }
    
}

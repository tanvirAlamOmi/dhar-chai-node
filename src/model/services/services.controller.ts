import { Controller, Get, Post, Put, Patch,  Delete, Body, Param } from '@nestjs/common'; 
import { ServiceDto } from './dto/service.dto';
import { Service } from './entities';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor( private readonly service: ServicesService ) {}

    @Get()
    async get(): Promise<Service[]> {
        return await this.service.findAll(); 
    } 
    
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Service> {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() serviceDto: ServiceDto): Promise<Service> {
        return await this.service.create(serviceDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() serviceDto: ServiceDto): Promise<ServiceDto> {
        return await this.service.update(id, serviceDto);
    }

    @Put(':id')
    async replace(@Param('id') id: string, @Body() serviceDto: ServiceDto): Promise<ServiceDto> {
        return await this.service.replace(id, serviceDto); 
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ServiceDto>  {
        return await this.service.delete(id);
    }
}
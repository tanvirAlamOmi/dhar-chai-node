import { Controller, Get, Post, Put, Patch,  Delete, Body, Param } from '@nestjs/common'; 
import { ServiceDto } from './dto/service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor(private readonly service: ServicesService){}

    @Get()
    async index(){
        return await this.service.findAll(); 
    } 
    
    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() serviceDto: ServiceDto) {
        return await this.service.create(serviceDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() serviceDto: ServiceDto) {
        return await this.service.update(id, serviceDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(id);
    }
}
import { Body, Controller, Get, Post, UseGuards, Request, Param, Patch, Put, Delete } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/guards';
import { UserDto } from './dto';
import { User } from './schemas';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private readonly service: UsersService ) {}

    @Get()
    async get(): Promise<User[]> {
        return await this.service.findAll(); 
    } 
    
    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() userDto: UserDto): Promise<User> {
        return await this.service.create(userDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
        return await this.service.update(id, userDto);
    }

    @Put(':id')
    async replace(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
        return await this.service.replace(id, userDto); 
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<UserDto>  {
        return await this.service.delete(id);
    }
}

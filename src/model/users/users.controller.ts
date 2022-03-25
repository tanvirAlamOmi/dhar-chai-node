import { Body, Controller, Get, Post, UseGuards, Request, Param, Patch, Put, Delete } from '@nestjs/common';
import { Roles } from 'src/common/decorators/metadatas';
import { Role } from 'src/common/enums';
import { JwtAccessAuthGuard } from 'src/common/guards/auth/jwt';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { UpdateDto, UserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private readonly service: UsersService ) {}

    @Get()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    async get(): Promise<User[]> {
        return await this.service.findAll(); 
    } 
    
    @Get(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getById(@Param('id') id: string): Promise<User> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() UpdateDto: UpdateDto): Promise<User> {
        return await this.service.update(id, UpdateDto);
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities';
import { Model } from 'mongoose'
import { UserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>){}

    async findAll(): Promise<User[]> {
        return await this.model.find().exec(); 
    }

    async findOne(id: string): Promise<User> {
        let user = await this.model.findById(id).exec();
        if(!user) throw new NotFoundException('could not find the user.')
        return user;
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.model.findOne({username}).exec();
        if(!user) throw new NotFoundException('could not find the user.')
        return user;
    }

    async create(userDto: UserDto): Promise<User> {
        let {password, ...rest} = userDto;

        const saltOrRounds = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, saltOrRounds);
        
        return await new this.model({
          ...rest,
          password: hash,
          createdAt: new Date(),
        }).save();
    }

    async update(id: string, userDto: UserDto): Promise<UserDto> {
        let user = await this.model.findByIdAndUpdate(id, userDto).exec();
        if(!user) throw new NotFoundException('could not find the user.')
        return user;
    }

    
    async replace(id: string, userDto: UserDto): Promise<UserDto> {
        let user = await this.model.findOneAndReplace({id}, userDto).exec();
        if(!user) throw new NotFoundException('could not find the user.')
        return user;
    }

    async delete(id: string): Promise<UserDto> {
        let user = await this.model.findByIdAndDelete(id).exec();
        if(!user) throw new NotFoundException('could not find the user.')
        return user;
    }
}

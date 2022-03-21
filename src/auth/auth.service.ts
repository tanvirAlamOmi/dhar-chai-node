import { Injectable, UnauthorizedException } from '@nestjs/common';
import { log } from 'console';
import { UsersService } from 'src/model/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';
import { User } from 'src/model/users/schemas';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;        
        const user = await this.userService.findByUsername(username);
        
        if (!(user && user.password === password)){
            throw new UnauthorizedException();
        }
        
        // const {username, password, ...rest} = user;
        return user;
    } 

    async login(loginDto: LoginDto): Promise<{}> {
        const user = await this.validateUser(loginDto);

        const payload = {
            name: user.name, 
            sub: user.id
        }

        return { access_token: this.jwtService.sign(payload) }
    }
}

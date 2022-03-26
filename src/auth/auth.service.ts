import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/model/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto } from './dto';
import { User } from 'src/model/users/entities';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;        
        const user = await this.userService.findByUsername(username);

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!(user && isPasswordMatch)){
            throw new UnauthorizedException();
        }
                
        // const {username, password, ...rest} = user;
        return user;
    } 

    async getTokens(user: any): Promise<{}> { //should get User type & return token type
        const payload = {
            sub: user.id, 
            info: {
                name:  user.name,
                roles: user.roles
            }
        }

        const [accessToken, refreshTokens] = await Promise.all([
            this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
                    expiresIn: '2w',
                }
            )
        ])

        return { 
            access_token: accessToken,
            refresh_token: refreshTokens,
        }

    }

    async login(loginDto: LoginDto): Promise<{}> {
        const user = await this.validateUser(loginDto);
        const tokens =  await this.getTokens(user);
        await this.userService.updateRefreshToken(user, tokens);
        return tokens;
    }

    async signup(signup: SignupDto): Promise<{}> {
        const user =  await this.userService.create(signup);
        const tokens =  await this.getTokens(user);
        await this.userService.updateRefreshToken(user['id'], tokens);
        return tokens;
    }

    async logout(userId: string) {
        const tokens = null;
        await this.userService.updateRefreshToken(userId, tokens);
        return 'logged out';
    }
    
    async refreshTokens(userToken: any) {
        const {sub, refreshToken} = userToken;
        const user = await this.userService.findOne(sub);
        if (!user || user.refreshToken) throw new ForbiddenException();
        
        const isMatched = await bcrypt.compare(refreshToken, user.refreshToken);

        if( !isMatched) throw new ForbiddenException();

        const tokens =  await this.getTokens(user);
        await this.userService.updateRefreshToken(user['id'], tokens);
        return tokens;
    }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/common/guards/auth/jwt';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('signup')
    async signup( @Body() signupDto: SignupDto ) {
        return this.service.signup(signupDto);
    }

    @Post('login')
    async login( @Body() loginDto: LoginDto){
        return this.service.login(loginDto);
    }

    @Post('logout')
    async logout() {
        return this.service.logout();

    }

    @Post('refresh')
    async refreshTokens() {
        return this.service.refreshTokens();
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get()
    async test() {
        return "sejuti";
    }
}

import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/common/decorators/metadatas/auth';
import { GetCurrentUserId } from 'src/common/decorators/requests';
import { JwtRefreshAuthGuard } from 'src/common/guards/auth/jwt';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Public()
    @Post('signup')
    async signup( @Body() signupDto: SignupDto ) {
        return this.service.signup(signupDto);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login( @Body() loginDto: LoginDto){
        return this.service.login(loginDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: string) {
        return this.service.logout(userId);
    }

    @Public()
    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(@Req() req: Request) {
        const userToken = req.user;
        return this.service.refreshTokens(userToken);
    }

    @Public()
    @Get()
    async test() {
        return "sejuti";
    }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login( @Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async test() {
        return "sejuti";
    }
}

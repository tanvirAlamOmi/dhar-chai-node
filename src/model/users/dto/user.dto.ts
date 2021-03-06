import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    roles: string;

    @IsOptional()
    refreshToken: string;
}
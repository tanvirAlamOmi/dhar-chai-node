import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    roles: string;
    
    @IsNotEmpty()
    createdAt: Date;
}
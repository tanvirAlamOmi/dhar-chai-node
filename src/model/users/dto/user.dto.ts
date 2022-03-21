import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
    
    @IsNotEmpty()
    createdAt: Date;
}
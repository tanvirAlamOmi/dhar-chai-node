import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDto {
    @IsOptional()
    name: string;

    @IsOptional()
    username: string;

    @IsOptional()
    password: string;

    @IsOptional()
    roles: string;
    
    @IsOptional()
    refreshToken: string;
    
    @IsOptional()
    createdAt: Date;
}
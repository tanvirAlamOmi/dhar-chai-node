import { IsEmail, IsString } from "class-validator";

export class ServiceDto {
    @IsString()
    title: string;

    @IsEmail()
    email: string;

    @IsString()
    description: string;
}
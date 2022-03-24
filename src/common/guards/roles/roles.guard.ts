import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/common/enums";

@Injectable()
export class RolesGueard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean  {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();
        // let user = {
        //     name: "fuckBoy",
        //     roles: "user"
        // }
        // console.log(user);
        

        return requiredRoles.some(role => user.roles?.includes(role));

        return true;
    }
}
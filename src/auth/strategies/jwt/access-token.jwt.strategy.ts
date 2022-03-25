import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export  class AccessTokenjwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret'  //move to env
        });
    }

    async validate(payload:any) {                
        return {
            sub: payload.sub,
            info: payload.info,
            
        }
    }
}
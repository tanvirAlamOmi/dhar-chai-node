import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

export  class RefreshTokenjwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',  //move to env
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload:any) {        
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken,
        }
    }
}
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


export type Payload = {
  uid: string;
  username: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly config: ConfigService) {
        super({
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest:ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                cookieExtractor
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get<string>("JWT_SECRET_KEY"),
        });
    }

    //戻り値が req.user に反映される
    async validate(payload: Payload) {
        return { uid: payload.uid, username: payload.username };
    }
}


const cookieExtractor = (req) => {
    let cookie = (req && req.cookies)? req.cookies["access-token"] : null;
    return cookie? cookie.token : null;
}
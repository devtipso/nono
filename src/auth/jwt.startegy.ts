import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { WebUsers } from "../../entities/WebUsers";
import { jwtPayload } from "./jwt-payload-interface";

export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(WebUsers) private repoWebUsers: Repository<WebUsers>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'eyJsb2dpbiI6InIiLCJuYW1lIjoiTEFCUkFETyBSVUJFTiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMTU1MzI4OSwiZXhwIjoxNjAxNTU2ODg5fQ'
        });
    }

    validate(payload: jwtPayload): Promise<WebUsers> {
        const { login } = payload;
        const user = this.repoWebUsers.findOne({ loginWuser: login })

        if (!user) throw new UnauthorizedException()
        return user
    }
} 
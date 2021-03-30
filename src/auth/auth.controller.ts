import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private srvUser: AuthService) { }

    @Post('/signin')
    signup(@Body() data: { login: string; password: string; }): Promise<{ accessToken: string }> {
        return this.srvUser.signup(data)
    }

}

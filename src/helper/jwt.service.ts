import { Injectable } from '@nestjs/common';
import { JwtService  } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
    constructor(private readonly jwtService: JwtService) { }
    
    sign(payload: { userId: string, uniqueKey: string }) {
        return this.jwtService.sign(payload);
       
    }

    verify(token: string) : {userId: string, uniqueKey: string} {
        return this.jwtService.verify(token);
    }
}

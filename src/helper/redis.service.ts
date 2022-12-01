import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
    constructor(@Inject('Redis') private readonly redisClient) { }

    async setUserToken(userId: string, token: string) {
        await this.redisClient.set(userId, token, {EX: 60 * 60 * 24 * 7, NX: true});
        return;
    }

    async getUserToken(userId: string) {
        const token = await this.redisClient.get(userId);
        return token;
    }
}

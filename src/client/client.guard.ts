import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtTokenService } from 'src/helper/jwt.service';
import { RedisService } from 'src/helper/redis.service';

@Injectable()
export class ClientGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtTokenService,
		private readonly redis: RedisService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		console.log('enter');
		const token = request.signedCookies['token'] || request.headers['token'];
		if (!token) {
			return false;
		}

		const userData = this.jwtService.verify(token);
		const redisToken = await this.redis.getUserToken(userData.userId);
		if (
			!userData ||
			!redisToken ||
			userData.uniqueKey !== redisToken
		) {
			return false;
		}
		request.user = userData.userId;
		return true;
	}
}

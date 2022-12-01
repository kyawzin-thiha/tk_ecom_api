import {
	Body,
	Controller,
	Post,
	Response,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { JwtTokenService } from 'src/helper/jwt.service';
import { RedisService } from 'src/helper/redis.service';
import { v4 } from 'uuid';
import { ClientGuard } from '../client.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly redis: RedisService,
		private readonly jwt: JwtTokenService,
	) {}

	@UseGuards(ClientGuard)
	@Post('validate')
	async validateUser() {
		return;
	}

	@Post('login')
	async login(
		@Response({ passthrough: true }) res,
		@Body() data: { email: string; password: string },
	) {
		const response = await fetch(`${process.env.API_URL}/e-com/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': '*',
			},
			body: JSON.stringify(data),
		});

		const { userData, status } = await response.json();

		if (status === 'error') {
			throw new UnauthorizedException('Invalid credentials');
		}

		const userKey = v4();
		const token = this.jwt.sign({
			userId: userData,
			uniqueKey: userKey,
		});
		this.redis.setUserToken(userData, userKey);
		res.cookie('token', token, {
			signed: true,
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});
		return;
	}

	@UseGuards(ClientGuard)
	@Post('logout')
	async logout(@Response({ passthrough: true }) res) {
		res.clearCookie('token', {
			signed: true,
			httpOnly: true,
		});
		return;
	}
}

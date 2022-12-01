import { JwtTokenService } from 'src/helper/jwt.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { createClient } from 'redis';
import { AwsService } from './aws.service';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [
		PrismaService,
		{
			provide: 'Redis',
			useFactory: async () => {
				const client = createClient();
				client.on('error', () => {
					console.log('Redis connection error');
					process.exit(1);
				});
				await client.connect();
				return client;
			},
		},
		RedisService,
		JwtTokenService,
		AwsService,
	],
	exports: [PrismaService, RedisService, JwtTokenService, AwsService],
})
export class HelperModule {}

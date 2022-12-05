import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser = require('cookie-parser');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	});
	app.use(helmet());
	app.use(cookieParser(process.env.COOKIE_SECRET));
	await app.listen(3000);
}
bootstrap();

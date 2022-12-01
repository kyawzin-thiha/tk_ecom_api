import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.headers['user'];
		if (!user || user !== process.env.ADMIN_USER) {
			return false;
		} else {
			return true;
		}
	}
}

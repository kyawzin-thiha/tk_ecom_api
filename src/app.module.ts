import { Module } from '@nestjs/common';
import { HelperModule } from './helper/helper.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule as AdminOrderModule } from './admin/order/order.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './client/auth/auth.module';

@Module({
	imports: [
		HelperModule,
		DatabaseModule,
		AdminOrderModule,
		RouterModule.register([
			{
				path: 'admin',
				module: AdminOrderModule,
			},
		]),
		AuthModule,
	],
})
export class AppModule {}

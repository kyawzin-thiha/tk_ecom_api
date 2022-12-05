import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HelperModule } from 'src/helper/helper.module';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule, HelperModule],
  controllers: [OrderController]
})
export class OrderModule {}

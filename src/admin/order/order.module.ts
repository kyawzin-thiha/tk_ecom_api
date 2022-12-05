import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController]
})
export class OrderModule {}

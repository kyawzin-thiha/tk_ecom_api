import { Module } from '@nestjs/common';
import { HelperModule } from 'src/helper/helper.module';
import { ProductController } from './product.controller';

@Module({
  imports: [HelperModule],
  controllers: [ProductController]
})
export class ProductModule {}

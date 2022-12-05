import { Module } from '@nestjs/common';
import { HelperModule } from 'src/helper/helper.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [HelperModule],
  controllers: [AuthController]
})
export class AuthModule {}

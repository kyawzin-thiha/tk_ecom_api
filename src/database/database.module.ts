import { Module } from '@nestjs/common';
import { HelperModule } from 'src/helper/helper.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [HelperModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { SupportEmployeeController } from './employee.controller';
import { SupportEmployeeService } from './employee.service';

@Module({
  controllers: [SupportEmployeeController],
  providers: [SupportEmployeeService],
})
export class SupportEmployeeModule {}

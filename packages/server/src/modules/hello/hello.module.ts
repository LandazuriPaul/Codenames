import { Module } from '@nestjs/common';

import { HelloController } from './hello.controller';

@Module({
  imports: [],
  controllers: [HelloController],
})
export class HelloModule {}

import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const config = app.get('ConfigService').envConfig;
  await app.listen(config.PORT);
}
bootstrap();

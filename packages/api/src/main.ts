import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const env = app.get('ConfigService').envConfig;
  const port = env.PORT;
  await app.listen(port);
}
bootstrap();

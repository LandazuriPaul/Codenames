import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/shared/config/config.service';

import { initAdapters } from './initAdapters';

async function bootstrap(): Promise<void> {
  // Instantiate server app
  const app = await NestFactory.create(APIModule);

  // Get server config
  const config = app.get(ConfigService).envConfig;

  // CORS settings
  app.enableCors({ origin: config.CORS_WHITELIST.split(',') });

  // Attach all adapters
  initAdapters(app);

  // Listen to configured port
  await app.listen(config.PORT);
}
bootstrap();

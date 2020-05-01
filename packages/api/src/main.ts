import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const env = app.get('ConfigService').envConfig;
  const port = env.PORT;
  await app.listen(port);
}
bootstrap();

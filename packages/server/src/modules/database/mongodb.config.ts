import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Room } from '~/entities';
import { ConfigService } from '~/modules/shared/config/config.service';

export class MongodbConfig {
  static getConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      entities: [Room],
      name: 'default',
      type: 'mongodb',
      host: configService.secretMongoHost,
      port: configService.secretMongoPort,
      username: configService.secretMongoUsername,
      password: configService.secretMongoPassword,
      database: configService.secretMongoDatabase,
      synchronize: false,
      useUnifiedTopology: true,
    };
  }
}

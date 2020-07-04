import { HexBase64Latin1Encoding } from 'crypto';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

import { DotenvParseOutput, parse } from 'dotenv';
import { number, object, string } from '@hapi/joi';
import { InternalServerErrorException, Logger } from '@nestjs/common';

export class ConfigService {
  public envConfig: DotenvParseOutput;
  public rootDir: string;
  public runningDir: string;

  private readonly configSchema = object({
    CORS_WHITELIST: string().required(),
    DICTIONARIES_PATH: string().required(),
    HOST: string().required(),
    JWT_EXPIRES_IN: string().default('1d'),
    PORT: number().default(4000),
    SOCKET_ROOM_ENCRYPTION_FORMAT: string()
      .lowercase()
      .valid('latin1', 'hex', 'base64')
      .required(),
    SOCKET_ROOM_HASH_ALGORITHM: string().default('sha1'),
    SECRET_JWT_KEY: string().required(),
    SECRET_MONGODB_DATABASE: string().required(),
    SECRET_MONGODB_HOST: string().required(),
    SECRET_MONGODB_PASSWORD: string().required(),
    SECRET_MONGODB_PORT: string().required(),
    SECRET_MONGODB_USERNAME: string().required(),
    SECRET_REDIS_HOST: string().required(),
    SECRET_REDIS_PASSWORD: string().required(),
    SECRET_REDIS_PORT: number().required(),
  });
  private logger = new Logger(ConfigService.name);

  constructor() {
    this.rootDir = `${join(process.cwd())}`;
    this.runningDir = `${join(this.rootDir, process.env.baseUrl || '')}`;

    // extract and validate config from ${NODE_ENV}.env file or CONFIG_PATH & SECRETS_PATH
    let config: DotenvParseOutput;
    const { CONFIG_PATH: configPath, SECRETS_PATH: secretsPath } = process.env;
    if (configPath && secretsPath) {
      config = this.getConfigFromVolumes(configPath, secretsPath);
    } else {
      config = this.getConfigFromEnvFile(process.env.NODE_ENV);
    }
    this.envConfig = this.validateInput(config);
  }

  /**
   * Extract the configuration from a `dotenv` file
   * @param env The environment name. Corresponding `name.env` file will be used. Default to `local`
   */
  private getConfigFromEnvFile(env = 'local'): DotenvParseOutput {
    const envFilePath = join('env', `${env}.env`);
    try {
      const config = parse(readFileSync(envFilePath));
      return config;
    } catch (err) {
      const msg = `Configuration error, see below:

/!\\ No environment definition found! Please choose one of the following options (in preference order):
  1. Set both the CONFIG_PATH and the SECRETS_PATH environment variables and fill their respective folders with corresponding environment values.
  2. Set the NODE_ENV environment variable and attach the corresponding "dotenv" file to the server.

`;
      this.logger.error(msg);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Extract the configuration from both the `config` and `secrets` folders.
   * @param configPath Path to the open `configurations` directory
   * @param secretsPath Path to the `secrets` directory
   */
  private getConfigFromVolumes(
    configPath: string,
    secretsPath: string
  ): DotenvParseOutput {
    const configFiles = readdirSync(configPath).filter(
      file => !file.includes('..')
    );
    const secretsFiles = readdirSync(secretsPath).filter(
      file => !file.includes('..')
    );
    const config: DotenvParseOutput = {};
    configFiles.reduce((partialConfig, file) => {
      partialConfig[file] = this.extractConfigFromFile(join(configPath, file));
      return partialConfig;
    }, config);
    secretsFiles.reduce((partialConfig, file) => {
      partialConfig[file] = this.extractConfigFromFile(join(secretsPath, file));
      return partialConfig;
    }, config);
    return config;
  }

  /**
   * Extract the configuration string from a file
   * @param filePath File path to read the config from
   */
  private extractConfigFromFile(filePath: string): string {
    const fileContent = readFileSync(filePath)
      .toString()
      .trim();
    return fileContent;
  }

  /**
   * Validate the configuration object against the required configuration schema
   * using the Joi library.
   * @param envConfig The config object
   */
  private validateInput(envConfig: DotenvParseOutput): DotenvParseOutput {
    const { error, value: validatedEnvConfig } = this.configSchema.validate(
      envConfig
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    this.printConfig(validatedEnvConfig);
    return validatedEnvConfig;
  }

  /**
   * Safely prints the server configuration. All secret values will be hidden.
   * @param envConfig
   */
  private printConfig(envConfig: DotenvParseOutput): void {
    const config = Object.keys(envConfig)
      .filter(key => !key.includes('SECRET'))
      .reduce((obj, key) => {
        obj[key] = envConfig[key];
        return obj;
      }, {} as DotenvParseOutput);
    const secrets = Object.keys(envConfig).filter(key =>
      key.includes('SECRET')
    );
    this.logger.log(
      `Server configuration:\n${JSON.stringify(config, null, 2)}`
    );
    this.logger.log(`Server secrets:\n${JSON.stringify(secrets, null, 2)}`);
  }

  /**
   * Config getters
   */

  get corsWhiteList(): string[] {
    return this.envConfig.CORS_WHITELIST.split(',');
  }

  get dictionariesPath(): string {
    return String(this.envConfig.DICTIONARIES_PATH);
  }

  get host(): string {
    return String(this.envConfig.HOST);
  }

  get jwtExpiresIn(): string {
    return String(this.envConfig.JWT_EXPIRES_IN);
  }

  get port(): number {
    return parseInt(this.envConfig.PORT, 10);
  }

  get socketRoomEncryptionFormat(): HexBase64Latin1Encoding {
    return String(
      this.envConfig.SOCKET_ROOM_ENCRYPTION_FORMAT
    ) as HexBase64Latin1Encoding;
  }

  get socketRoomHashAlgorithm(): string {
    return String(this.envConfig.SOCKET_ROOM_HASH_ALGORITHM);
  }

  get secretJwtKey(): string {
    return String(this.envConfig.SECRET_JWT_KEY);
  }

  get secretMongoDatabase(): string {
    return String(this.envConfig.SECRET_MONGODB_DATABASE);
  }
  get secretMongoHost(): string {
    return String(this.envConfig.SECRET_MONGODB_HOST);
  }

  get secretMongoPassword(): string {
    return String(this.envConfig.SECRET_MONGODB_PASSWORD);
  }

  get secretMongoPort(): number {
    return parseInt(this.envConfig.SECRET_MONGODB_PORT, 10);
  }

  get secretMongoUsername(): string {
    return String(this.envConfig.SECRET_MONGODB_USERNAME);
  }

  get secretRedisHost(): string {
    return String(this.envConfig.SECRET_REDIS_HOST);
  }

  get secretRedisPassword(): string {
    return String(this.envConfig.SECRET_REDIS_PASSWORD);
  }

  get secretRedisPort(): number {
    return parseInt(this.envConfig.SECRET_REDIS_PORT, 10);
  }
}

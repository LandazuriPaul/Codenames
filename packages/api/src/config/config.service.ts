import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { HexBase64Latin1Encoding } from 'crypto';

import { DotenvParseOutput, parse } from 'dotenv';
import { ObjectSchema, SchemaMap, number, object, string, validate } from 'joi';
import { InternalServerErrorException, Logger } from '@nestjs/common';

export class ConfigService {
  public rootDir: string;
  public runningDir: string;

  private readonly configSchema: SchemaMap = {
    // TODO
    // JWT_ENCRYPTION_FORMAT: string()
    //   .lowercase()
    //   .valid(['hex', 'base64', 'latin1'])
    //   .required(),
    // JWT_ENCRYPTION_PASSWORD_HASH_LENGTH: number().required(),
    // JWT_EXPIRE_TIME: number().required(),
    // JWT_SECRET: string().required(),
    // ENCRYPTION_RANDOM_BYTES_LENGTH: number().default(12)
    HOST: string().required(),
    PORT: number().default(4000),
  };
  private envConfig: DotenvParseOutput;
  private logger = new Logger(ConfigService.name);

  constructor() {
    const { CONFIG_PATH: configPath, SECRETS_PATH: secretsPath } = process.env;
    let config: DotenvParseOutput;
    if (configPath && secretsPath) {
      config = this.getConfigFromVolume(configPath, secretsPath);
    } else {
      config = this.getConfigFromEnvFile(process.env.NODE_ENV);
    }
    this.envConfig = this.validateInput(config);
    this.rootDir = `${join(process.cwd())}`;
    this.runningDir = `${join(this.rootDir, process.env.baseUrl || '')}`;
  }

  private getConfigFromEnvFile(env?: string): DotenvParseOutput {
    if (!env) {
      const msg = `No environment definition found. Please choose one of the following options (in priority order):
      1. Set both the CONFIG_PATH and the SECRETS_PATH environment variables and fill their respective folders with corresponding environment values.
      2. Set the NODE_ENV environment variable and attach the env file to the API.`;
      throw new InternalServerErrorException(msg);
    }
    const envFilePath = join('env', `${env}.env`);
    const config = parse(readFileSync(envFilePath));
    return config;
  }

  private getConfigFromVolume(
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
    configFiles.reduce(
      (partialConfig, file) =>
        this.extractConfigFromFile(partialConfig, file, configPath),
      config
    );
    secretsFiles.reduce(
      (partialConfig, file) =>
        this.extractConfigFromFile(partialConfig, file, secretsPath),
      config
    );
    return config;
  }

  private extractConfigFromFile(
    partialConfig: DotenvParseOutput,
    file: string,
    dir: string
  ): DotenvParseOutput {
    const filePath = join(dir, file);
    const fileContent = readFileSync(filePath)
      .toString()
      .trim();
    partialConfig[file] = fileContent;
    return partialConfig;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: DotenvParseOutput): DotenvParseOutput {
    const envVarsSchema: ObjectSchema = object(this.configSchema);
    const { error, value: validatedEnvConfig } = validate(
      envConfig,
      envVarsSchema
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    this.printConfig(envConfig);
    return validatedEnvConfig;
  }

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
    this.logger.log(`API configuration:\n${JSON.stringify(config, null, 2)}`);
    this.logger.log(`API secrets:\n${JSON.stringify(secrets, null, 2)}`);
  }

  get encryptionFormat(): HexBase64Latin1Encoding {
    const format = String(this.envConfig.ENCRYPTION_FORMAT);
    switch (format) {
      case 'hex':
        return 'hex' as 'hex';
      case 'base64':
        return 'base64' as 'base64';
      case 'latin1':
      default:
        return 'latin1' as 'latin1';
    }
  }

  get encryptionPasswordHashLength(): number {
    return parseInt(this.envConfig.ENCRYPTION_PASSWORD_HASH_LENGTH, 10);
  }

  get encryptionRandomBytesLength(): number {
    return parseInt(this.envConfig.ENCRYPTION_RANDOM_BYTES_LENGTH, 10);
  }

  get host(): string {
    return String(this.envConfig.HOST);
  }

  get jwtSecret(): string {
    return String(this.envConfig.JWT_SECRET);
  }

  get jwtExpireTime(): number {
    return parseInt(this.envConfig.JWT_EXPIRE_TIME, 10);
  }
}

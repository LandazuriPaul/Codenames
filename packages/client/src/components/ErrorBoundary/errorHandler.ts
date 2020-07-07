import { Logger } from '~/utils';

export function errorHandler(error: Error): void {
  Logger.error(error);
}

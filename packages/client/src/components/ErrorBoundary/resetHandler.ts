import { Logger } from '~/utils';

export function resetHandler(): void {
  Logger.log('application reset after error');
  location.reload();
}

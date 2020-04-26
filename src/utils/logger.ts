import debug from 'debug';

const LOGGER_PREFIX = 'codenames';

const debugInfo = debug(`${LOGGER_PREFIX}:info`);
debugInfo.enabled = true;
debugInfo.color = '#01c205';

const debugWarn = debug(`${LOGGER_PREFIX}:warn`);
debugWarn.enabled = true;
debugWarn.color = '#ccc310';

const debugError = debug(`${LOGGER_PREFIX}:error`);
debugError.enabled = true;
debugError.color = '#b01405';

const formatArgs = (args: any[]): any => {
  if (args && args.length > 1) {
    return args;
  }
  return args[0];
};

export class Logger {
  static info(...args): void {
    return debugInfo(formatArgs(args));
  }

  static log(...args): void {
    return debugInfo(formatArgs(args));
  }

  static warn(...args): void {
    return debugWarn(formatArgs(args));
  }

  static error(e: Error, ...rest): void {
    let message = e.toString();
    if (e.stack) {
      message = `${message}\n__Stack trace__\n\n${e.stack}`;
    }
    return debugError(message, rest.length > 0 ? rest : undefined);
  }
}

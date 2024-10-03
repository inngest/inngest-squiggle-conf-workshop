type LogLevel = 'info' | 'debug' | 'error';

class Logger {
  level: LogLevel = 'debug';

  setLevel(level: LogLevel) {
    this.level = level;
  }

  info(...args) {
    console.log(...['[INFO]', ...args]);
  }
  debug(...args) {
    if (this.level === 'debug') {
      console.log(...['[DEBUG]', ...args]);
    }
  }
  error(...args) {
    console.log(...['[❌ ERROR]', ...args]);
  }
}

export const logger = new Logger();

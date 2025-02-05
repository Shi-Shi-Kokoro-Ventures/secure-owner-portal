type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };

    this.logs.push(entry);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console[level](message, data);
    }

    // In production, you might want to send logs to a service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement production logging service
      // This could be integrated with services like Sentry, LogRocket, etc.
    }
  }

  public info(message: string, data?: any) {
    this.log('info', message, data);
  }

  public warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  public error(message: string, data?: any) {
    this.log('error', message, data);
  }

  public getLogs(): LogEntry[] {
    return this.logs;
  }
}

export const logger = Logger.getInstance();
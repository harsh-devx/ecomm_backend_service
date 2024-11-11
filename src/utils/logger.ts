import pino, { type Logger } from "pino";

const level = process.env.NODE_ENV === "development" ? "trace" : "info";
const _logger: Logger = pino({
    level
});

export type LoggerType = {
    debug: (message: string, context?: any) => void;
    info: (message: string, context?: any) => void;
    warn: (message: string, context?: any) => void;
    error: (message: string, context?: any) => void;
    trace: (message: string, context?: any) => void;
    child: (context: any) => LoggerType;
};

function createLogger(_logger: Logger): LoggerType {
    return {
        debug: (message: string, context?: any) => _logger.debug(context ?? {}, message),
        info: (message: string, context?: any) => _logger.info(context ?? {}, message),
        warn: (message: string, context?: any) => _logger.warn(context ?? {}, message),
        error: (message: string, context?: any) => _logger.error(context ?? {}, message),
        trace: (message: string, context?: any) => _logger.trace(context ?? {}, message),
        child: (context: any): LoggerType => createLogger(_logger.child(context))
    };
}

export const logger = createLogger(_logger);

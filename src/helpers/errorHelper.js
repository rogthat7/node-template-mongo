class AppError extends Error {
    constructor(error) {
        super(error.message);

        this.statusCode = error.statusCode;
        this.status = `${error.statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
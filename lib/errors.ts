/**
 * Base Application Error
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;

    constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Validation Error (400)
 */
export class ValidationError extends AppError {
    constructor(message: string, code = 'VALIDATION_ERROR') {
        super(message, 400, code);
    }
}

/**
 * Unauthorized Error (401)
 */
export class UnauthorizedError extends AppError {
    constructor(message: string, code = 'UNAUTHORIZED') {
        super(message, 401, code);
    }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends AppError {
    constructor(message: string, code = 'NOT_FOUND') {
        super(message, 404, code);
    }
}

/**
 * Database Operation Error (500)
 */
export class DatabaseError extends AppError {
    constructor(message: string, code = 'DATABASE_ERROR') {
        super(message, 500, code);
    }
}

/**
 * Production-ready error handling utilities
 */

/**
 * Error types for better error categorization
 */
export const ErrorTypes = {
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  DATABASE: 'DATABASE_ERROR',
  EXTERNAL_API: 'EXTERNAL_API_ERROR',
  NETWORK: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  RATE_LIMIT: 'RATE_LIMIT_ERROR',
  INTERNAL: 'INTERNAL_SERVER_ERROR',
};

/**
 * Logs errors with context for production monitoring
 * In production, this should integrate with error tracking services (Sentry, LogRocket, etc.)
 */
export function logError(error, context = {}) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error?.message || 'Unknown error',
    stack: error?.stack,
    name: error?.name,
    type: error?.type || ErrorTypes.INTERNAL,
    context: {
      ...context,
      environment: process.env.NODE_ENV,
      userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location?.href : undefined,
    },
  };

  // In development, log to console with full details
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Log:', errorLog);
  } else {
    // In production, log structured error (can be sent to monitoring service)
    console.error(JSON.stringify(errorLog));
    
    // Integrate with error tracking service (Sentry, LogRocket, etc.)
    // Uncomment and configure when ready:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: context });
    // } else if (typeof process !== 'undefined' && process.env.SENTRY_DSN) {
    //   const Sentry = require('@sentry/nextjs');
    //   Sentry.captureException(error, { extra: context });
    // }
  }

  return errorLog;
}

/**
 * Creates a standardized API error response
 */
export function createErrorResponse(error, statusCode = 500, context = {}) {
  // Log the error
  logError(error, context);

  // Determine user-friendly message
  let userMessage = 'An unexpected error occurred. Please try again later.';
  let errorType = ErrorTypes.INTERNAL;

  // Handle specific error types
  if (error.name === 'ValidationError' || error.type === ErrorTypes.VALIDATION) {
    userMessage = error.message || 'Invalid input provided';
    errorType = ErrorTypes.VALIDATION;
    statusCode = 400;
  } else if (error.name === 'CastError' || error.message?.includes('Cast to')) {
    userMessage = 'Invalid data format';
    errorType = ErrorTypes.VALIDATION;
    statusCode = 400;
  } else if (error.message?.includes('Unauthorized') || error.type === ErrorTypes.AUTHENTICATION) {
    userMessage = 'Authentication required';
    errorType = ErrorTypes.AUTHENTICATION;
    statusCode = 401;
  } else if (error.message?.includes('Forbidden') || error.type === ErrorTypes.AUTHORIZATION) {
    userMessage = 'You do not have permission to perform this action';
    errorType = ErrorTypes.AUTHORIZATION;
    statusCode = 403;
  } else if (error.message?.includes('not found') || error.type === ErrorTypes.NOT_FOUND) {
    userMessage = 'The requested resource was not found';
    errorType = ErrorTypes.NOT_FOUND;
    statusCode = 404;
  } else if (error.message?.includes('timeout') || error.type === ErrorTypes.TIMEOUT) {
    userMessage = 'Request timed out. Please try again.';
    errorType = ErrorTypes.TIMEOUT;
    statusCode = 408;
  } else if (error.message?.includes('network') || error.message?.includes('fetch failed') || error.type === ErrorTypes.NETWORK) {
    userMessage = 'Network error. Please check your connection and try again.';
    errorType = ErrorTypes.NETWORK;
    statusCode = 503;
  } else if (error.message?.includes('rate limit') || error.type === ErrorTypes.RATE_LIMIT) {
    userMessage = 'Too many requests. Please try again later.';
    errorType = ErrorTypes.RATE_LIMIT;
    statusCode = 429;
  } else if (error.message?.includes('Mongo') || error.message?.includes('database') || error.type === ErrorTypes.DATABASE) {
    userMessage = 'Database error. Please try again later.';
    errorType = ErrorTypes.DATABASE;
    statusCode = 503;
  } else if (error.message?.includes('API') || error.type === ErrorTypes.EXTERNAL_API) {
    userMessage = 'External service error. Please try again later.';
    errorType = ErrorTypes.EXTERNAL_API;
    statusCode = 502;
  }

  // Don't expose internal error details in production
  const response = {
    success: false,
    error: {
      message: userMessage,
      type: errorType,
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack,
      }),
    },
  };

  return { response, statusCode };
}

/**
 * Wraps async route handlers with error handling
 * For Next.js App Router API routes
 */
export function withErrorHandler(handler) {
  return async (req) => {
    try {
      return await handler(req);
    } catch (error) {
      const { response, statusCode } = createErrorResponse(error, 500, {
        route: req.url || req.nextUrl?.pathname,
        method: req.method,
      });
      
      return new Response(JSON.stringify(response), {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}

/**
 * Validates required fields in request body
 */
export function validateRequiredFields(data, requiredFields) {
  const missing = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  if (missing.length > 0) {
    const error = new Error(`Missing required fields: ${missing.join(', ')}`);
    error.type = ErrorTypes.VALIDATION;
    throw error;
  }
}

/**
 * Validates file upload
 */
export function validateFileUpload(file, options = {}) {
  const {
    maxSize = 2 * 1024 * 1024, // 2MB default
    allowedTypes = ['application/pdf'],
    allowedExtensions = ['.pdf'],
  } = options;

  if (!file) {
    const error = new Error('No file provided');
    error.type = ErrorTypes.VALIDATION;
    throw error;
  }

  if (file.size > maxSize) {
    const error = new Error(`File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`);
    error.type = ErrorTypes.VALIDATION;
    throw error;
  }

  if (!allowedTypes.includes(file.type)) {
    const error = new Error(`File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`);
    error.type = ErrorTypes.VALIDATION;
    throw error;
  }
}


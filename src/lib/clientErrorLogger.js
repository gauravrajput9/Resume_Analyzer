/**
 * Client-side error logging utility
 * Integrates with error tracking services for production monitoring
 */

/**
 * Logs client-side errors with context
 */
export function logClientError(error, context = {}) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error?.message || 'Unknown error',
    stack: error?.stack,
    name: error?.name,
    type: error?.type || 'CLIENT_ERROR',
    context: {
      ...context,
      environment: process.env.NODE_ENV,
      userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location?.href : undefined,
      pathname: typeof window !== 'undefined' ? window.location?.pathname : undefined,
    },
  };

  // In development, log to console with full details
  if (process.env.NODE_ENV === 'development') {
    console.error('Client Error Log:', errorLog);
  } else {
    // In production, log structured error
    console.error(JSON.stringify(errorLog));
    
    // Integrate with error tracking service (Sentry, LogRocket, etc.)
    // Uncomment and configure when ready:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { 
    //     extra: context,
    //     tags: { component: context.component || 'unknown' }
    //   });
    // }
    
    // Optional: Send to your own error tracking endpoint
    // fetch('/api/errors/log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorLog),
    // }).catch(() => {}); // Silently fail if logging fails
  }

  return errorLog;
}

/**
 * Sets up global error handlers for unhandled errors
 */
export function setupGlobalErrorHandlers() {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logClientError(event.reason, {
      type: 'UNHANDLED_REJECTION',
      source: 'global_handler',
    });
    
    // Prevent default browser error handling in production
    if (process.env.NODE_ENV === 'production') {
      event.preventDefault();
    }
  });

  // Handle unhandled errors
  window.addEventListener('error', (event) => {
    logClientError(event.error || new Error(event.message), {
      type: 'UNHANDLED_ERROR',
      source: 'global_handler',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
}


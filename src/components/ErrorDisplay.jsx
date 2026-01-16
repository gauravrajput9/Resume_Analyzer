"use client";

import { AlertCircle, X, RefreshCw, WifiOff, Clock, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

/**
 * Production-ready error display component
 * Shows user-friendly error messages with retry functionality
 */
export default function ErrorDisplay({ 
  error, 
  onRetry, 
  onDismiss,
  title = "Error",
  className = "",
  showDetails = false,
  autoDismiss = false,
  dismissDelay = 10000,
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after specified delay if enabled
  useEffect(() => {
    if (autoDismiss && !onRetry && !onDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, dismissDelay);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissDelay, onRetry, onDismiss]);

  if (!isVisible || !error) return null;

  // Extract error message
  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message || error?.error?.message || "An unexpected error occurred";

  // Determine error type for styling and icon
  const errorType = error?.type || error?.error?.type || "INTERNAL";
  const isNetworkError = errorType === "NETWORK" || errorType === "NETWORK_ERROR" || errorMessage.toLowerCase().includes("network");
  const isTimeoutError = errorType === "TIMEOUT" || errorType === "TIMEOUT_ERROR" || errorMessage.toLowerCase().includes("timeout");
  const isValidationError = errorType === "VALIDATION" || errorType === "VALIDATION_ERROR";
  const isDatabaseError = errorType === "DATABASE" || errorType === "DATABASE_ERROR";
  const isExternalApiError = errorType === "EXTERNAL_API" || errorType === "EXTERNAL_API_ERROR";

  // Choose appropriate icon
  const getIcon = () => {
    if (isNetworkError) return <WifiOff className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />;
    if (isTimeoutError) return <Clock className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />;
    if (isValidationError) return <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />;
    return <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />;
  };

  // Determine border color based on error type
  const getBorderColor = () => {
    if (isValidationError) return "border-yellow-500/50";
    if (isNetworkError || isTimeoutError) return "border-orange-500/50";
    return "border-red-500/50";
  };

  // Determine background color
  const getBackgroundColor = () => {
    if (isValidationError) return "bg-yellow-950/30";
    if (isNetworkError || isTimeoutError) return "bg-orange-950/30";
    return "bg-red-950/30";
  };

  // Determine text color
  const getTextColor = () => {
    if (isValidationError) return "text-yellow-300";
    if (isNetworkError || isTimeoutError) return "text-orange-300";
    return "text-red-300";
  };

  const getTitleColor = () => {
    if (isValidationError) return "text-yellow-400";
    if (isNetworkError || isTimeoutError) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div 
      className={`${getBackgroundColor()} border ${getBorderColor()} rounded-lg p-4 mb-4 ${className}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${getTitleColor()} mb-1`}>{title}</h3>
          <p className={`${getTextColor()} text-sm break-words`}>{errorMessage}</p>
          
          {/* Show helpful suggestions based on error type */}
          {isNetworkError && (
            <p className="text-xs text-gray-400 mt-2">
              💡 Check your internet connection and try again
            </p>
          )}
          {isTimeoutError && (
            <p className="text-xs text-gray-400 mt-2">
              💡 The request took too long. Please try again
            </p>
          )}
          {isDatabaseError && (
            <p className="text-xs text-gray-400 mt-2">
              💡 Database service is temporarily unavailable. Please try again later
            </p>
          )}
          {isExternalApiError && (
            <p className="text-xs text-gray-400 mt-2">
              💡 External service is temporarily unavailable. Please try again later
            </p>
          )}
          
          {/* Show additional context in development */}
          {showDetails && process.env.NODE_ENV === 'development' && error?.stack && (
            <details className="mt-2">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">
                Technical Details (Dev Only)
              </summary>
              <pre className="mt-2 text-xs text-gray-300 overflow-auto bg-black/50 p-2 rounded border border-gray-700">
                {error.stack}
              </pre>
            </details>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            {onRetry && (error?.retryable !== false) && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className={`${isValidationError 
                  ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-900/40"
                  : isNetworkError || isTimeoutError
                  ? "bg-orange-900/20 border-orange-500/50 text-orange-300 hover:bg-orange-900/40"
                  : "bg-red-900/20 border-red-500/50 text-red-300 hover:bg-red-900/40"
                }`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsVisible(false);
                  onDismiss();
                }}
                className={`${getTextColor()} hover:bg-gray-800/50`}
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={() => {
              setIsVisible(false);
              onDismiss();
            }}
            className={`${getTitleColor()} hover:opacity-70 flex-shrink-0 transition-opacity`}
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Inline error display for form fields
 */
export function InlineError({ error, className = "" }) {
  if (!error) return null;

  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message || "Invalid input";

  return (
    <p className={`text-sm text-red-400 mt-1 ${className}`} role="alert">
      {errorMessage}
    </p>
  );
}


/**
 * Client-side error handling utilities
 */

/**
 * Handles API errors and extracts user-friendly messages
 */
export function handleApiError(error) {
  // Handle network errors
  if (!error || error.message === 'Failed to fetch' || error.message?.includes('NetworkError')) {
    return {
      message: "Network error. Please check your internet connection and try again.",
      type: "NETWORK",
      retryable: true,
    };
  }

  // Handle timeout errors
  if (error.message?.includes('timeout') || error.message?.includes('aborted')) {
    return {
      message: "Request timed out. Please try again.",
      type: "TIMEOUT",
      retryable: true,
    };
  }

  // Handle API response errors
  if (error.response || error.error) {
    const apiError = error.response?.data || error.error || error;
    
    return {
      message: apiError.error?.message || apiError.message || "An error occurred. Please try again.",
      type: apiError.error?.type || apiError.type || "INTERNAL",
      retryable: apiError.error?.type === "NETWORK" || apiError.error?.type === "TIMEOUT",
    };
  }

  // Handle generic errors
  return {
    message: error?.message || "An unexpected error occurred. Please try again.",
    type: error?.type || "INTERNAL",
    retryable: false,
  };
}

/**
 * Fetches with automatic error handling
 */
export async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error?.message || data.message || `HTTP ${response.status}`);
      error.type = data.error?.type || "INTERNAL";
      error.status = response.status;
      error.response = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Re-throw if it's already a formatted error
    if (error.type) {
      throw error;
    }

    // Handle fetch errors
    const handledError = handleApiError(error);
    const newError = new Error(handledError.message);
    newError.type = handledError.type;
    newError.retryable = handledError.retryable;
    throw newError;
  }
}

/**
 * Retry logic for failed requests
 */
export async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchWithErrorHandling(url, options);
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx) except for network/timeout
      if (error.status >= 400 && error.status < 500 && error.type !== "NETWORK" && error.type !== "TIMEOUT") {
        throw error;
      }
      
      // Don't retry if not retryable
      if (!error.retryable && attempt < maxRetries) {
        continue;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Max 10 seconds
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}


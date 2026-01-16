"use client";

import { useEffect } from "react";
import { setupGlobalErrorHandlers, logClientError } from "@/lib/clientErrorLogger";

/**
 * Global error handler component
 * Sets up error handlers for unhandled errors and promise rejections
 */
export function ErrorHandler({ children }) {
  useEffect(() => {
    // Set up global error handlers
    setupGlobalErrorHandlers();

    // Handle route errors
    const handleRouteError = (event) => {
      logClientError(new Error(event.detail?.message || "Route error"), {
        type: "ROUTE_ERROR",
        source: "route_handler",
      });
    };

    window.addEventListener("route-error", handleRouteError);

    return () => {
      window.removeEventListener("route-error", handleRouteError);
    };
  }, []);

  return <>{children}</>;
}


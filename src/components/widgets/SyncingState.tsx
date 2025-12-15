"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

interface SyncingStateProps {
  status: "pending" | "in_progress" | "failed" | "needs_sync";
  errorMessage?: string | null;
  onRetry?: () => void;
  companyName?: string;
}

async function triggerManualSync() {
  const response = await fetch("/api/qbo/trigger-sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to trigger sync");
  }
  
  return response.json();
}

export function SyncingState({ status, errorMessage, onRetry, companyName }: SyncingStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryError(null);
    
    try {
      await triggerManualSync();
      // Refresh the status after triggering
      if (onRetry) {
        onRetry();
      }
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : "Failed to trigger sync");
    } finally {
      setIsRetrying(false);
    }
  };

  const getStatusContent = () => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="w-16 h-16 text-amber-500" />,
          title: "Sync Queued",
          description: "Your QuickBooks data is queued for syncing. This usually starts within a minute.",
          showSpinner: true,
        };
      case "in_progress":
        return {
          icon: <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />,
          title: "Syncing Your Data",
          description: "We're pulling your QuickBooks data. This may take a few minutes for accounts with years of history.",
          showSpinner: true,
        };
      case "failed":
        return {
          icon: <AlertCircle className="w-16 h-16 text-red-500" />,
          title: "Sync Failed",
          description: errorMessage || "Something went wrong while syncing your data. Please try again.",
          showSpinner: false,
        };
      case "needs_sync":
        return {
          icon: <RefreshCw className="w-16 h-16 text-gray-400" />,
          title: "No Data Yet",
          description: "Your QuickBooks account is connected, but no data has been synced yet.",
          showSpinner: false,
        };
      default:
        return {
          icon: <Loader2 className="w-16 h-16 text-gray-400" />,
          title: "Loading...",
          description: "Please wait...",
          showSpinner: true,
        };
    }
  };

  const content = getStatusContent();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-[#1a1f2e] transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-white/10 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                {content.icon}
              </div>

              {/* Company Name */}
              {companyName && (
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    {companyName}
                  </span>
                </div>
              )}

              {/* Title & Description */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {content.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
                  {content.description}
                </p>
              </div>

              {/* Progress Indicator */}
              {content.showSpinner && (
                <div className="mb-6">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse w-2/3" />
                  </div>
                  <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
                    This page will refresh automatically when ready
                  </p>
                </div>
              )}

              {/* Retry Button for Failed State */}
              {(status === "failed" || status === "needs_sync") && (
                <div className="flex flex-col items-center gap-3">
                  <Button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 disabled:opacity-50"
                  >
                    {isRetrying ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    {isRetrying ? "Starting Sync..." : "Retry Sync"}
                  </Button>
                  {retryError && (
                    <p className="text-sm text-red-500 dark:text-red-400">{retryError}</p>
                  )}
                </div>
              )}

              {/* Tips */}
              {(status === "pending" || status === "in_progress") && (
                <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    💡 While you wait:
                  </h4>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Initial sync fetches up to 4 years of data</li>
                    <li>• Daily syncs will keep everything up to date</li>
                    <li>• You can close this tab - sync continues in background</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


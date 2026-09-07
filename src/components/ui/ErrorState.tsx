import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load data telemetry',
  description = 'An unexpected network error occurred while querying the revenue engine.',
  onRetry,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center p-6 space-y-3', className)}>
      <div className="p-3 bg-rose-950/60 rounded-full border border-rose-800/60 text-rose-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-400 max-w-sm">{description}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Retry Telemetry Sync
        </Button>
      )}
    </div>
  );
};

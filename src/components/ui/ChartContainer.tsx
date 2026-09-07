import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
import { Skeleton } from './Skeleton';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils';

export interface ChartContainerProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
  className?: string;
  height?: string | number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  action,
  isLoading = false,
  isError = false,
  isEmpty = false,
  onRetry,
  children,
  className,
  height = 'h-72',
}) => {
  return (
    <Card className={cn('flex flex-col justify-between', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold text-white">{title}</CardTitle>
          {description && <CardDescription className="text-xs text-gray-400 mt-0.5">{description}</CardDescription>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="pt-2 flex-1">
        {isLoading ? (
          <div className={cn('w-full flex items-center justify-center', typeof height === 'string' ? height : '')} style={typeof height === 'number' ? { height } : undefined}>
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ) : isError ? (
          <div className={cn('w-full flex items-center justify-center', typeof height === 'string' ? height : '')} style={typeof height === 'number' ? { height } : undefined}>
            <ErrorState onRetry={onRetry} />
          </div>
        ) : isEmpty ? (
          <div className={cn('w-full flex items-center justify-center', typeof height === 'string' ? height : '')} style={typeof height === 'number' ? { height } : undefined}>
            <EmptyState title="No chart data" description="Insufficient telemetry data available for the selected period." />
          </div>
        ) : (
          <div className={cn('w-full', typeof height === 'string' ? height : '')} style={typeof height === 'number' ? { height } : undefined}>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

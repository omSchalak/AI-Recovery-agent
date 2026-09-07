import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-800/70', className)}
      {...props}
    />
  );
};

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center border border-dashed border-gray-800 rounded-xl bg-gray-900/30', className)}>
      {icon && <div className="p-3 bg-gray-800/80 rounded-xl text-cyan-400 mb-3">{icon}</div>}
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm mt-1 mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

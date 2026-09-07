import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Tooltip } from './Tooltip';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendLabel = 'vs last period',
  tooltip,
  icon,
  badge,
  subtitle,
  className,
}) => {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <Card className={cn('relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300', className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
          <span>{title}</span>
          {tooltip && (
            <Tooltip content={tooltip}>
              <Info className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 transition-colors" />
            </Tooltip>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-gray-800/80 rounded-lg text-cyan-400 border border-gray-700/60 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-all">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {value}
        </div>
        {badge}
      </div>

      {(trend !== undefined || subtitle) && (
        <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs">
          {trend !== undefined ? (
            <div className="flex items-center gap-1">
              <Badge
                variant={isPositive ? 'success' : 'danger'}
                size="sm"
                className="font-semibold"
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {Math.abs(trend)}%
              </Badge>
              <span className="text-gray-500">{trendLabel}</span>
            </div>
          ) : (
            <span className="text-gray-400">{subtitle}</span>
          )}
        </div>
      )}
    </Card>
  );
};

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './Input';
import { Skeleton } from './Skeleton';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  sortKey?: keyof T;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  searchPlaceholder = 'Search records...',
  onRowClick,
  pageSize = 6,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no records matching your criteria.',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Search filter
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some((val) =>
        String(val ?? '').toLowerCase().includes(query)
      )
    );
  }, [data, searchQuery]);

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      return sortDirection === 'asc' ? 1 : -1;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (column: Column<T>) => {
    const key = column.sortKey || (typeof column.accessorKey === 'string' ? column.accessorKey : null);
    if (!key) return;

    if (sortColumn === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else setSortColumn(null);
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <div className="text-xs text-gray-400 self-end sm:self-center">
          Showing <span className="font-semibold text-white">{paginatedData.length}</span> of{' '}
          <span className="font-semibold text-white">{filteredData.length}</span> records
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto border border-gray-800 rounded-xl bg-gray-900/80 backdrop-blur-sm">
        <table className="w-full text-left text-sm text-gray-300 border-collapse">
          <thead className="bg-gray-950/80 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn(
                    'px-4 py-3.5 select-none',
                    col.sortable && 'cursor-pointer hover:text-white transition-colors',
                    col.className
                  )}
                  onClick={() => col.sortable && handleSort(col)}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-gray-500">
                        {sortColumn === (col.sortKey || col.accessorKey) ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800/60">
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, rIdx) => (
                <tr key={rIdx}>
                  {columns.map((_, cIdx) => (
                    <td key={cIdx} className="px-4 py-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8">
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => (
                <tr
                  key={(row.id as string) || rIdx}
                  className={cn(
                    'hover:bg-gray-800/40 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col, cIdx) => {
                    const content =
                      typeof col.accessorKey === 'function'
                        ? col.accessorKey(row)
                        : (row[col.accessorKey] as React.ReactNode);

                    return (
                      <td key={cIdx} className={cn('px-4 py-3.5 align-middle', col.className)}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-xs text-gray-400">
            Page <span className="font-semibold text-white">{currentPage}</span> of{' '}
            <span className="font-semibold text-white">{totalPages}</span>
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

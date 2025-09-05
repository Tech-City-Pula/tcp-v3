import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { type BlogRow, blogColumns } from './blogs-columns';

type BlogsTableProps = {
  data: BlogRow[] | undefined | null;
};

export function BlogsTable({ data }: BlogsTableProps) {
  const safeData = useMemo<BlogRow[]>(() => (Array.isArray(data) ? data : []), [data]);

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  // We no longer present a column-based table, so column visibility state is unnecessary.

  const table = useReactTable({
    data: safeData,
    columns: blogColumns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!filterValue) {
        return true;
      }
      const title: string = row.getValue('title');
      return title.toLowerCase().includes(String(filterValue).toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    enableSortingRemoval: false,
    getRowId: (row) => row.id,
  });

  // Provide a simple toggle for createdAt sorting (newest/oldest)
  const createdAtSorting = sorting.find((s) => s.id === 'createdAt');
  const toggleCreatedAtSort = () => {
    setSorting((prev) => {
      const cur = prev.find((p) => p.id === 'createdAt');
      if (!cur) {
        return [{ id: 'createdAt', desc: true }];
      }
      return [{ id: 'createdAt', desc: !cur.desc }];
    });
  };

  return (
    <div className="space-y-4">
      {/* Card list */}
      <ol className="space-y-4" aria-live="polite">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            const r = row.original; // BlogRow
            // No excerpt field in BlogRow shape; keep minimal preview just title & date.
            return (
              <li key={row.id} className="rounded border p-4 transition hover:bg-muted/40">
                <article>
                  <header className="space-y-1">
                    <h2 className="font-semibold text-base leading-snug">
                      {/* If you later add slug, update href */}
                      <a href={`/blog/${row.id}`} className="hover:underline focus:underline">
                        {r.title}
                      </a>
                    </h2>
                    <p className="text-muted-foreground text-xs">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}
                    </p>
                  </header>
                </article>
              </li>
            );
          })
        ) : (
          <li className="rounded border p-8 text-center text-muted-foreground">No posts</li>
        )}
      </ol>

      {/* Pagination */}
      {(() => {
        const { pageIndex } = table.getState().pagination;
        const pageCount = table.getPageCount() || 1;
        return (
          <nav
            aria-label="Pagination"
            className="sticky bottom-4 z-20 mx-auto w-full max-w-lg rounded-lg border bg-background px-3 py-4 shadow-md"
          >
            {/* Header section with title, sort, and search */}
            <div className="mb-3 flex justify-between gap-2">
              <Input
                aria-label="Search by title"
                placeholder="Search title..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.currentTarget.value)}
                className="text-sm"
              />
              <button
                type="button"
                onClick={toggleCreatedAtSort}
                className="w-12 rounded border text-xs hover:bg-muted/40"
                aria-label="Toggle sort by publish date"
              >
                {createdAtSorting?.desc ? '↓' : '↑'}
              </button>
            </div>

            {/* Pagination section */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="order-2 mx-auto flex items-center gap-2 font-medium text-xs sm:order-1 sm:mx-0">
                <span>
                  Page <span className="tabular-nums">{pageIndex + 1}</span> /{' '}
                  <span className="tabular-nums">{pageCount}</span>
                </span>
                <span className="opacity-60">• {safeData.length} total</span>
              </div>
              <div className="order-1 flex w-full items-center justify-between gap-2 self-start sm:order-2 sm:w-auto sm:self-auto">
                <button
                  type="button"
                  className="inline-flex w-full items-center gap-1 rounded border bg-muted/40 px-2 py-1 font-medium text-xs transition hover:bg-muted focus:outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className="inline-flex w-full items-center gap-1 rounded border bg-primary/90 px-2 py-1 font-medium text-primary-foreground text-xs shadow-sm transition hover:bg-primary focus:outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </div>
          </nav>
        );
      })()}
    </div>
  );
}

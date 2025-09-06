import type { ColumnDef } from '@tanstack/react-table';

export type BlogRow = {
  id: string;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

function formatDate(value: Date | string) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  return d.toLocaleDateString();
}

export const blogColumns: ColumnDef<BlogRow>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'title',
    header: () => 'Title',
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return <span className="inline-block max-w-[400px] truncate">{v}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: () => 'Created',
    enableSorting: true,
    cell: ({ getValue }) => {
      const v = getValue<Date | string>();
      return (
        <time dateTime={String(v)} className="text-muted-foreground text-xs">
          {v ? formatDate(v) : ''}
        </time>
      );
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'updatedAt',
    header: () => 'Updated',
    enableSorting: false,
    cell: ({ getValue }) => {
      const v = getValue<Date | string>();
      return (
        <time dateTime={String(v)} className="text-muted-foreground text-xs">
          {v ? formatDate(v) : ''}
        </time>
      );
    },
  },
];

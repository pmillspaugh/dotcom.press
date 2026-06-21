import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Domain } from "./DomainSearch";
import styles from "./Table.module.css";

export function Table({ domains }: { domains: Domain[] }) {
  const columns = useMemo<ColumnDef<Domain>[]>(
    () => [
      {
        accessorKey: "domain",
        header: "Domain",
      },
      {
        accessorKey: "available",
        header: "Available?",
        cell: ({ row }) => {
          const available = row.original.available;
          return available ? "Yes" : "No";
        },
      },
      {
        accessorKey: "used",
        header: "Used?",
        cell: ({ row }) => {
          const used = row.original.used;
          if (used === undefined) return "--";
          return used ? "Yes" : "No";
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          const price = row.original.price;
          if (price === null) return "--";

          return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(price);
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: domains,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} onClick={() => header.column.toggleSorting()}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

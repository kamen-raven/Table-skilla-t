// CallsTable.tsx
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table';

// Пример заглушки данных
const mockData = [
  { id: 1, type: 'incoming', date: '2024-11-01', duration: 120, hasRecording: true },
  { id: 2, type: 'outgoing', date: '2024-11-02', duration: 80, hasRecording: false },
  // Добавь больше данных, если нужно
];

// Определение колонок
const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'date',
    header: 'Дата',
  },
  {
    accessorKey: 'type',
    header: 'Тип',
  },
  {
    accessorKey: 'duration',
    header: 'Продолжительность (сек)',
  },
  {
    accessorKey: 'hasRecording',
    header: 'Запись',
    cell: ({ getValue }) => (getValue() ? '✓' : '✗'), // Индикация наличия записи
  },
];

const Ee: React.FC = () => {
  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(), // Для управления моделью строк
  });





  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th colSpan={header.colSpan} key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Ee;

import React from 'react';
import styles from './TableRow.module.scss';
import { TableRowInterface } from './TableRow.interface';
import useInteractionStore from '../../../../store/useInteractionStore';
import { flexRender } from '@tanstack/react-table';


const TableRow: React.FC<TableRowInterface> = ({ row }) => {
  const setHoveredRow = useInteractionStore((state) => state.setHoveredRow);

  return (
    <tr className={`${styles.tRow}`} key={row.id}
      onMouseEnter={() => setHoveredRow(row.id)}
      onMouseLeave={() => setHoveredRow(null)}
    >
      {row.getVisibleCells().map((cell) => {
        // Проверяем наличие accessorKey
        const accessorKey = 'accessorKey' in cell.column.columnDef
          ? cell.column.columnDef.accessorKey
          : undefined;
        return (
          <td className={`${styles.tData}
        ${accessorKey === 'time' ? styles.tData_right : ''}`}
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>)
      })}
    </tr>
  );
};

export { TableRow };

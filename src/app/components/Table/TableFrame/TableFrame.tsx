import React from 'react';
import {

  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';


import styles from './TableFrame.module.scss';
import { TableFrameInterface } from './TableFrame.interface.ts';
import { tableColumnData } from '../TableColumn/tableColumnData.tsx';
import useInteractionStore from '../../../../store/useInteractionStore.ts';




// Функциональный компонент таблицы
const TableFrame: React.FC<TableFrameInterface> = ({ callListData }) => {
  const setHoveredRow = useInteractionStore((state) => state.setHoveredRow);
/*   const setHeaderCellType = useInteractionStore((state) => state.setHeaderCellType);
 */

  const table = useReactTable({
    data: callListData,
    columns: tableColumnData,
    getCoreRowModel: getCoreRowModel(),
  });


  return (

    <>
      <div className={styles.tableWrapper}>

        <table className={styles.table}>
          <thead className={styles.tHead}>

            {table.getHeaderGroups().map((headerGroup) => (
              <tr className={`${styles.tRow} ${styles.tRow__tHead}`}
                key={headerGroup.id}>

                {headerGroup.headers.map((header) => {
                  // Проверяем наличие accessorKey
                  const accessorKey = 'accessorKey' in header.column.columnDef
                    ? header.column.columnDef.accessorKey
                    : undefined;

                  return (
                    <th className={`${styles.tHead__tHeaderData}
                      ${accessorKey === 'time' ? styles.tHead__tHeaderData_right : ''}
                    `}  key={header.id}  >

                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                    </th>
                  )
                })}

              </tr>
            ))}
          </thead>
          <tbody className={styles.tBody}>
            {table.getRowModel().rows.map((row) => (
              <tr className={`${styles.tRow} ${styles.tRow__tBody}`} key={row.id}
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
            ))}
          </tbody>
          <tfoot className={styles.tFoot}>

          </tfoot>
        </table >
      </div >
    </>


  );
};

export default TableFrame;
{/*       <div className="filters">
        <select>
          <option value="">Все типы</option>
          <option value="1">Входящие</option>
          <option value="0">Исходящие</option>
        </select>
        <select>
          <option value="1">1 день</option>
          <option value="3">3 дня</option>
          <option value="7">Неделя</option>

        </select>
      </div>
 */}

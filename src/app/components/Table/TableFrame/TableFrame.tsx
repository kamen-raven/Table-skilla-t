import React, { useEffect, useState } from 'react';
import {

  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';


import styles from './TableFrame.module.scss';
import { TableFrameInterface } from './TableFrame.interface.ts';

import { CallDataInterface } from '~interfaces/callListResponse.interface';
import fetchCalls from '~api/components/fetchCallList';
import { tableHeader } from '../../../../data/tableHeaderData';


// Функциональный компонент таблицы
const TableFrame: React.FC<TableFrameInterface> = ({ callListData }) => {


/*   const [calls, setCalls] = useState<CallDataInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


 */
/*   useEffect(() => {
    const loadCalls = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCalls({
          date_start: '2024-11-01',
          date_end: '2024-11-14',
          in_out: 1, // Пример для входящих
          limit: 50,
        });
        setCalls(data.results);
      } catch (err) {
        setError(`Не удалось загрузить данные: ${err} `);
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, []);
 */

  const table = useReactTable({
    data: callListData,
    columns: tableHeader,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">



<>
      <div className="filters">
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


      <table className="calls-table">
        <thead className = {styles.table}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
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
          </>
        
    </div>
  );
};

export default TableFrame;

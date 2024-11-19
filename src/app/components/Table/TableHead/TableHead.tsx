import React from 'react';
import styles from './TableHead.module.scss';
import { TableHeadInterface } from './TableHead.interface';
import { flexRender } from '@tanstack/react-table';


const TableHead: React.FC<TableHeadInterface> = ({ table }) => {
    return (
      <thead className={styles.tHead}>

      {table.getHeaderGroups().map((headerGroup) => (
        <tr className={`${styles.tHeadRow}`}
          key={headerGroup.id}>

          {headerGroup.headers.map((header) => {
            // Проверяем наличие accessorKey
            const accessorKey = 'accessorKey' in header.column.columnDef
              ? header.column.columnDef.accessorKey
              : undefined;

            return (
              <th className={`${styles.tHead__tHeaderData}
                ${accessorKey === 'time' ? styles.tHead__tHeaderData_right : ''}
              `} key={header.id}  >

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
    );
};

export { TableHead };

import React from 'react';
import {
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';


import styles from './TableFrame.module.scss';
import { TableFrameInterface } from './TableFrame.interface.ts';
import { tableColumnData } from '../TableColumn/tableColumnData.tsx';
import { TableBody } from '../TableBody/TableBody.tsx';
import { TableHead } from '../TableHead/TableHead.tsx';


// Функциональный компонент таблицы
const TableFrame: React.FC<TableFrameInterface> = ({ callListData }) => {

  const table = useReactTable({
    data: callListData,
    columns: tableColumnData,
    getCoreRowModel: getCoreRowModel(),
  });


  return (

    <>
      <div className={styles.tableWrapper}>

        <table className={styles.table}>
          <TableHead table={table}/>
          <TableBody table={table} />
        </table >
      </div >
    </>


  );
};

export default TableFrame;

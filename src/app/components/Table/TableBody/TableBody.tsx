import React from 'react';
import styles from './TableBody.module.scss';
import { TableBodyInterface } from './TableBody.interface';
import { Row } from '@tanstack/react-table';
import { CallDataInterface } from '~interfaces/callListResponse.interface';
import { TableRow } from '../TableRow/TableRow';
import { formattingDate, yesterdayDate } from '~utils/date-fns';


const TableBody: React.FC<TableBodyInterface> = ({ table }) => {
  const allRows = table.getRowModel().rows;
  const firstDate = allRows[0].original.date_notime;


  // формируем массив с id строками новых дат
  function getInfoRows(rows: Row<CallDataInterface>[]): number[] {
    const infoRowsIds: number[] = [];
    let date = firstDate;
    rows.forEach((row) => {
      if (date !== row.original.date_notime) {
        infoRowsIds.push(row.index);
        date = row.original.date_notime;
      }
    })
    return infoRowsIds;
  }
  const infoRowsIds = getInfoRows(allRows);


  // рендер строки с новой датой
  const renderDateInfoRow = (row: Row<CallDataInterface>) => {
    let date = row.original.date_notime;
    const countRows = allRows.filter((item) => item.original.date_notime === date).length;

    if (date === yesterdayDate) {
      date = "Вчера";
    } else {
      date = formattingDate(date);
    }

    return (
      <tr className={styles.dateInfoRow}>
        <td className = {styles.dateInfoCell} colSpan={table.getVisibleFlatColumns().length}> {/* растягиваем на всю ширину строки */}
          <p className={styles.date}>
            {date}
            <span className={styles.count}>
              {countRows}
            </span>
          </p>
        </td>
      </tr>
    );
  };



  return (
    <tbody className={styles.tBody}>
      {allRows.map((row) => (
        <React.Fragment key={row.id}>
          {infoRowsIds.includes(row.index) && renderDateInfoRow(row)}
          <TableRow row={row} />
        </React.Fragment>
      ))}
    </tbody>
  );
};

export { TableBody };

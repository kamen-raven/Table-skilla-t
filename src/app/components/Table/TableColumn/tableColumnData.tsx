import { CellContext } from '@tanstack/react-table';
import { CallDataInterface } from '~interfaces/callListResponse.interface';
import { DurationCell, EmployeeCell, GradeCell, HeaderCell, PhoneCell, SourceCell, TimeCell, TypeCallCell } from './elements';

//  данные шапки таблицы
/*   in_out: number;
  date: string;
  person_avatar: string; // аватар сотрудника
  to_number: string;
  source: string;
  is_skilla: number;
  time: number;
  employee_name: string; // Дополнительные данные (имя сотрудника) */


// Определяем колонки
export const tableColumnData = [
  //* ТИП НОМЕРА
  {
    accessorKey: 'in_out',
    header: () => <HeaderCell type={'in_out'} />,
    cell: ({ getValue, row }: CellContext<CallDataInterface, 1 | 0>) => {
      const inOut = getValue();
      const status = row.original.status;

      return (
        <TypeCallCell status={status} inOut={inOut} />
      );
    },
  },

  //* ВРЕМЯ (с фильтром)
  {
    accessorKey: 'date',
    header: () => <HeaderCell type={'date'} />,
    cell: ({ getValue }: CellContext<CallDataInterface, string>) => {
      const timeData = getValue();

      return (
        <TimeCell timeData={timeData} />
      );
    },
  },

  //* СОТРУДНИК
  {
    accessorKey: 'person_avatar',
    header: () => <HeaderCell type={'person_avatar'} />,
    cell: ({ getValue, row }: CellContext<CallDataInterface, string>) => {
      const avatarUrl = getValue();
      const employeeName = row.original.person_name;
      const employeeSurname = row.original.person_surname;

      return (
        <EmployeeCell
          avatarImgUrl={avatarUrl}
          personName={employeeName}
          personSurname={employeeSurname}
        />
      );
    },
  },

  //* ЗВОНОК
  {
    accessorKey: 'to_number',
    header: () => <HeaderCell type={'to_number'} />,
    cell: ({ getValue, row }: CellContext<CallDataInterface, string>) => {
      const toNumber = getValue();
      const contactName = row.original.contact_name;
      const contactCompany = row.original.contact_company;

      return (
        <PhoneCell toNumber={toNumber} contactName={contactName} contactCompany={contactCompany} />
      );
    },
  },

  //* ИСТОЧНИК
  {
    accessorKey: 'source',
    header: () => <HeaderCell type={'source'} />,
    cell: ({ getValue }: CellContext<CallDataInterface, string>) => {
      const source = getValue();

      return (
        <SourceCell source={source}/>
      );
    },
  },

  //* ОЦЕНКА
  {
    accessorKey: 'grade',
    header: () => <HeaderCell type={'grade'} />,
    cell: ({ row }: CellContext<CallDataInterface, string>) => {
      const errors = row.original.errors;
      const status = row.original.status;

      return (
        <GradeCell errors={errors} status={status}/>
      );
    },
  },

  //* ДЛИТЕЛЬНОСТЬ
  {
    accessorKey: 'time',
    header: () => <HeaderCell type={'time'} />,
    cell: ({ getValue, row }: CellContext<CallDataInterface, number>) => {
      const duration = getValue();
      const rowId = row.id;

      const record = row.original.record;
      const partnershipId = row.original.partnership_id;

      return (
        <DurationCell duration={duration} rowId={rowId} record={record} partnershipId={partnershipId} />
      );
    },

  },
];

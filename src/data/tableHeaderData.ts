// Интерфейс данных шапки таблицы
export interface TableHeaderInterface {
  in_out: number; // ТИП
  date: string; // ВРЕМЯ
  person_avatar: string; // СОТРУДНИК
  to_number: string; // ЗВОНОК
  source: string; // ИСТОЧНИК
  is_skilla: number; //ОЦЕНКА
  time: number; // ДЛИТЕЛЬНОСТЬ
}

// Определяем колонки
export const tableHeader = [
  {
    accessorKey: 'in_out',
    header: 'Тип',
  },
  {
    accessorKey: 'date',
    header: 'Время',
  },
  {
    accessorKey: 'person_avatar',
    header: 'Аватар',
  },
  {
    accessorKey: 'to_number',
    header: 'Номер',
  },
  {
    accessorKey: 'source',
    header: 'Источник',
  },
  {
    accessorKey: 'is_skilla',//!!!!
    header: 'Оценка',
  },
  {
    accessorKey: 'time',
    header: 'Длительность',
  },
];

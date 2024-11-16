import { format, subDays } from 'date-fns';

// Получаем текущую дату
const currentDate = format(new Date(), 'yyyy-MM-dd');

// Вычитаем 2 дня (включая текущий день, то есть текущий — 1 день)
const threeDaysAgo = format(subDays(currentDate, 2), 'yyyy-MM-dd');

export {
  currentDate,
  threeDaysAgo
}

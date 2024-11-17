import { format, subDays } from 'date-fns';

// Получаем текущую дату
const currentDate = format(new Date(), 'yyyy-MM-dd');

// Вычитаем 2 дня (включая текущий день, то есть текущий — 1 день)
const threeDays = format(subDays(currentDate, 2), 'yyyy-MM-dd');


function formatTimeWithDateFns(dateString: string): string {
  const date = new Date(dateString); // Преобразуем строку в объект Date
  return format(date, 'HH:mm'); // Форматируем в ЧЧ:ММ
}


function formatTimeFromMinutes(minutes: number): string {
  // Вычисляем количество минут и секунд
  const min = Math.floor(minutes);
  const sec = Math.round((minutes - min) * 60); // Секунды - это остаток от минут, умноженный на 60

  // Форматируем результат в строку MM:SS
  const formattedTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  return formattedTime;
};


function formatTimeFromSeconds(seconds: number): string {
  // Вычисляем минуты и секунды
  const min = Math.floor(seconds / 60); // Количество полных минут
  const sec = Math.floor(seconds % 60); // Остаток - это секунды

  // Форматируем результат в строку MM:SS
  const formattedTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  return formattedTime;
}


export {
  currentDate,
  threeDays,
  formatTimeWithDateFns,
  formatTimeFromMinutes,
  formatTimeFromSeconds
}

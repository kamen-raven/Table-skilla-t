// Основной интерфейс для ответа от API со списком звонков
export interface CallListResponseInterface {
  total_rows: string; // Общее количество записей по запросу
  results: CallDataInterface[]; // Массив данных по звонкам
}

// Основной интерфейс для данных по отдельному звонку
export interface CallDataInterface {
  id: number;
  partnership_id?: string;
  partner_data?: PartnerDataInterface;
  date: string; // Дата и время звонка //???
  date_notime: string; // Дата без времени  //???
  time?: number; // Длительность звонка в секундах //???
  from_number?: string; // Номер, с которого был звонок
  from_extension?: string; // Внутренний номер звонящего
  to_number?: string; // Номер, на который был звонок
  to_extension?: string; // Внутренний номер получателя
  is_skilla?: number; // Признак того, что звонок ушел в КЦ
  status: 'Дозвонился' | 'Не дозвонился'; // Статус звонка (например, "Дозвонился" или "Не дозвонился")
  record?: string; // ID записи звонка
  line_number?: string; // Номер линии звонка
  line_name?: string; // Название линии или источника звонка
  in_out?: 1 | 0; // Признак входящего (1) или исходящего (0) звонка
  from_site: number; // Признак звонка с сайта
  source?: string; // Источник звонка
  errors?: string[];//CallErrorInterface[]; // Ошибки, связанные с звонком
  disconnect_reason?: string; // Причина разъединения
  results?: CallResultInterface[]; // Итог звонка
  stages?: StageInterface[]; // Стадии, пройденные сотрудниками
  abuse?: AbuseInterface; // Жалоба на звонок (если есть)
  contact_name?: string; // Имя контакта
  contact_company?: string; // Название компании контакта
  person_id?: number; // ID сотрудника, участвовавшего в звонке
  person_name?: string; // Имя сотрудника
  person_surname?: string; // Фамилия сотрудника
  person_avatar?: string; // URL аватара сотрудника
}


// Данные о партнере, который связан с вызовом
export interface PartnerDataInterface {
  id: string;
  name: string;
  phone: string;
}


// Ошибка, связанная с звонком
export interface CallErrorInterface {
  title: string;
}

// Результат звонка
export interface CallResultInterface {
  type: string;
  title: string;
  tooltip?: string;
}


// Данные о сотруднике, который участвовал в звонке
export interface StageInterface {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string;
  disconnect_reason: string;
}


// Информация о жалобе на звонок
export interface AbuseInterface {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: {
    message: string;
    from_support: number;
    support_read_status: number;
    person_read_status: number;
  }[];
}

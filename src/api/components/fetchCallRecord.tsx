/*
import { PATH_API } from "../utils/path-api";
import { CallRecordInterface } from "~interfaces/callRecord.interface";

interface FetchCallRecordParams {
  record: string; // 	id записи из списка звонков
  partnership_id: string; // id партнера из списка звонков
}

export default async function fetchCalls(
  { record, partnership_id }: FetchCallRecordParams
): Promise<CallRecordInterface> {


  // Формируем строку запроса
  const queryParams = new URLSearchParams();
  queryParams.append('record', record);
  queryParams.append('partnership_id', partnership_id);

  const url = `${PATH_API.fetchCall.record}?${queryParams.toString()}`;


  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.statusText}`);
    }


    return response.json();
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}
 */

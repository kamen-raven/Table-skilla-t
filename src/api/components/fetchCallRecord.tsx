
import { PATH_API } from "../utils/path-api";


interface FetchCallRecordParams {
  record: string; // 	id записи из списка звонков
  partnershipId: string; // id партнера из списка звонков
}

export default async function fetchCallRecord(
  params: FetchCallRecordParams
): Promise< string  | null>  {

  // Формируем строку запроса
  const queryParams = new URLSearchParams();
  queryParams.append('record', params.record);
  queryParams.append('partnership_id', params.partnershipId);

  const url = `${PATH_API.fetchCall.record}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.statusText}`);
    }
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);

    return  audioUrl; // Возвращаем объект с URL
  } catch (error) {
    console.error('Ошибка при получении записи звонка:', error);
    return null;
  }
};

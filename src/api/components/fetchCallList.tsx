import { PATH_API } from "~api/utils/path-api";
import { CallListResponseInterface } from "~api/interface/callListResponse.interface";


export interface FetchCallsParams {
  date_start: string; // Начальная дата в формате 'YYYY-MM-DD'
  date_end: string; // Конечная дата в формате 'YYYY-MM-DD'
  in_out?: 0 | 1 | "all"; // Тип звонков (0 - исходящие, 1 - входящие)
  limit?: number; // Лимит записей
  sort_by?: "date" | "duration";
  order?: "ASC" | "DESC";
}

export default async function fetchCalls(
  params: FetchCallsParams
): Promise<CallListResponseInterface> {


  // Формируем строку запроса
  const queryParams = new URLSearchParams();
  queryParams.append('date_start', params.date_start);
  queryParams.append('date_end', params.date_end);
  if (params.in_out && params.in_out !== "all") {
    queryParams.append('in_out', params.in_out.toString());
  }
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params.order) queryParams.append('order', params.order);

  const url = `${PATH_API.fetchCall.list}?${queryParams.toString()}`;


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

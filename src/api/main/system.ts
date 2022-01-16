import request from '@/utils/request';
import { IDataType } from '../types';
export function getPageList(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url,
    data: queryInfo,
  });
}

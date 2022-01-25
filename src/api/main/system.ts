import request from '@/utils/request';
import { IDataType } from '../types';
export function getPageList(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url,
    data: queryInfo,
  });
}

export function deletePageItem(url: string) {
  return request.delete<IDataType>({
    url,
  });
}

export function createPageItem(url: string, formData: any) {
  return request.post<IDataType>({
    url,
    data: formData,
  });
}

export function editPageItem(url: string, formData: any) {
  return request.patch<IDataType>({
    url,
    data: formData,
  });
}

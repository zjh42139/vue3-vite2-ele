import dayjs from 'dayjs';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function formateUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs(utcString).format(format);
}

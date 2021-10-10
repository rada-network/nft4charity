import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatDateTypeNumber = (date: number) => dayjs.unix(date).format('DD/MM/YYYY');

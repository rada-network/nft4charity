import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => {
  if (date.toString().length % 10 === 0) return dayjs.unix(date).format('MMMM D, YYYY h:mm A');

  return dayjs(date).format('MMMM D, YYYY h:mm A');
};

export const formatDateTypeNumber = (date: number) => {
  if (date.toString().length % 10 === 0) return dayjs.unix(date).format('DD/MM/YYYY');

  return dayjs(date).format('DD/MM/YYYY');
};

export const formatShortenAddress = (address: string) => {
  return address.substr(0, 4) + '...' + address.substr(address.length - 4, address.length);
};

export const formatBalance = (number: string) => {
  return parseFloat(number).toFixed(4);
};

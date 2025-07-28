import { formatDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function convertToReadableTime(string: string) {
  const timeList = string.split(':');
  if (
    timeList.length < 2 ||
    Number.isNaN(parseInt(timeList[0])) ||
    Number.isNaN(parseInt(timeList[1]))
  ) {
    return string;
  }

  const formattedTime = formatDuration(
    {
      hours: Math.abs(parseInt(timeList[0])),
      minutes: Math.abs(parseInt(timeList[1])),
    },
    { locale: ptBR },
  );

  return formattedTime;
}

export function formatServings(string: string) {
  const splitted = string.split(' ');
  if (splitted.length < 2 || Number.isNaN(parseInt(splitted[0]))) return string;

  if (splitted[0] === '1' && /(ões|oes)$/i.test(splitted[1])) {
    return `${splitted[0]} ${splitted[1].replace(/(ões|oes)$/i, 'ão')}`;
  }

  if (splitted[0] === '1' && splitted[1].endsWith('s')) {
    return `${splitted[0]} ${splitted[1].replace('s', '')}`;
  }

  return string;
}

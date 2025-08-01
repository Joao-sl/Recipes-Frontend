import { formatDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function convertToReadableTime(string: string, shortFormat = false) {
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

  if (shortFormat) {
    const parts = formattedTime.split(' ');

    if (parts.length === 2) {
      const timeString = parts[1][0];
      return `${parts[0]}${timeString}`;
    }

    const hoursString = parts[1][0];
    const minutesString = parts[3][0];

    return `${parts[0]}${hoursString} ${parts[2]}${minutesString}`;
  }

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

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function brazilianDateFormat(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, 'dd/MM/yyyy', {
    locale: ptBR,
  });
}

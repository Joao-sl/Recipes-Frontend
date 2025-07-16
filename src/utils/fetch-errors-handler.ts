import { toast } from 'react-toastify';

export function fetchErrorHandler(statusCode: number) {
  if (statusCode === 503) {
    return toast.error('Servidor em manutenção tente novamente mais tarde');
  } else if (statusCode >= 500) {
    return toast.error('Erro interno do servidor');
  } else if (statusCode === 401) {
    return toast.error('Credenciais inválidas tente fazer login novamente');
  } else if (statusCode === 403) {
    return toast.error('Você não tem autorização para fazer isso');
  } else if (statusCode === 404) {
    return toast.error('Erro 404, não encontrado');
  } else if (statusCode >= 400) {
    return toast.error('Não conseguimos completar a sua solicitação por favor verifique os dados');
  } else {
    return toast.error('Erro Desconhecido, tente novamente mais tarde');
  }
}

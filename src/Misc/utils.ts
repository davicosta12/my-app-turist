import { addLocale } from 'primereact/api';
import { createContext, MutableRefObject } from 'react';

export interface IContextProps {
  toast: MutableRefObject<any> | null,
  opNotification: MutableRefObject<any> | null,
  opUsers: MutableRefObject<any> | null,
}

export const ThemeContext = createContext<IContextProps>({
  toast: null,
  opNotification: null,
  opUsers: null,
});

export const createBrazilianCalendar = () => {
  addLocale('pt-br', {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['dom', 'sen', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    today: 'Hoje',
    clear: 'Limpar',
  });
}

export const toastSuccess = (msg?: string) =>
  Object.assign({
    severity: 'success',
    summary: 'Sucesso',
    detail: msg,
  })

export const toastInfo = (msg?: string, whiteSpace: boolean = false) =>
  Object.assign({
    severity: 'info',
    summary: 'Informação',
    detail: msg,
    contentStyle: { overflow: 'auto', whiteSpace: whiteSpace ? 'pre' : undefined },
  })

export const toastError = (err: any, msg?: string, whiteSpace: boolean = false) => {
  console.error(err);
  return Object.assign({
    severity: 'error',
    detail: (typeof err === 'string' ? err : msg) || err?.data?.title || err?.data?.erroMessage || err?.data?.message || err?.message || 'Ocorreu um erro',
    contentStyle: { overflow: 'auto', whiteSpace: whiteSpace ? 'pre' : undefined }
  });
}

export const cpfIsValid = (cpf: string) => {
  if (cpf) {

    let strCPF = cpf.replace(/[^\d]+/g, '');
    if (strCPF === '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (strCPF.length !== 11 ||
      strCPF === "00000000000" ||
      strCPF === "11111111111" ||
      strCPF === "22222222222" ||
      strCPF === "33333333333" ||
      strCPF === "44444444444" ||
      strCPF === "55555555555" ||
      strCPF === "66666666666" ||
      strCPF === "77777777777" ||
      strCPF === "88888888888" ||
      strCPF === "99999999999")
      return false;
    // Valida 1o digito	
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(strCPF.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
      rev = 0;
    // Valida 2o digito	
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(strCPF.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
      rev = 0;
    if (rev !== parseInt(strCPF.charAt(10)))
      return false;
    return true;
  }
  return false;
}

export const requiredFieldMsg = "Campo obrigatório";
export const invalidStringMsg = 'Formato inválido';
export const invalidAttachmentMsg = 'Conteúdo inválido';
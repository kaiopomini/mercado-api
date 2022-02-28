export function validadeCPF(cpf: string): boolean {

  const onlyDigitsCPF = cpf.replace(/[^\d]/g, "");
  let sum = 0;
  let rest: number;

  if (onlyDigitsCPF === "00000000000") {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum +=  parseInt(onlyDigitsCPF.substring(i - 1, i)) * (11 - i);
  }
  
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)){
    rest = 0;
  }

  if (rest !== parseInt(onlyDigitsCPF.substring(9, 10))){
    return false;
  } 

  sum = 0;
  for (let i = 1; i <= 10; i++){
    sum += parseInt(onlyDigitsCPF.substring(i - 1, i)) * (12 - i);
  } 
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)){
    rest = 0;
  }
  if (rest !== parseInt(onlyDigitsCPF.substring(10, 11))){
    return false;
  } 

  return true;
  
} 
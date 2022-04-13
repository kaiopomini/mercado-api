export function validadeCPF(cpf: string): boolean {
  if (cpf === undefined || cpf === null) {
    return false;
  }

  const validDigitsReg = new RegExp("^[0-9]+$");

  if (!validDigitsReg.test(cpf)) {
    return false;
  }

  let sum = 0;
  let rest: number;

  if (cpf === "00000000000" || cpf.length !== 11) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

export function validatePhone(phone: string): boolean {
  
  // const validPhoneMaskReg = new RegExp("/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/");

  const validDigitsReg = new RegExp("^[0-9]{10,11}$");
 
  if (!validDigitsReg.test(phone)) {
    return false;
  }

  return true;
}

export function validatePhoneDDI(ddi: string): boolean {
  
  const validDigitsReg = new RegExp("^[+][0-9]{1,3}$");

  if (!validDigitsReg.test(ddi)) {
    return false;
  }

  return true;
}

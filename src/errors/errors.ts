import { AplicationError } from "./protocol";

function invalidFileFormatError(): AplicationError {
  return {
    type: "invalidFileFormatError",
    message: "Tipo de arquivo inválido. Somente são aceitos arquivos .csv",
  };
}

function invalidCsvHeaderError(): AplicationError {
  return {
    type: "invalidCsvHeaderError",
    message: "Cabeçalhos do csv inválidos.",
  };
}

function invalidCsvDataError(): AplicationError {
  return {
    type: "invalidCsvDataError",
    message: "Dados do csv inválidos.",
  };
}

function invalidProductCodeError(): AplicationError {
  return {
    type: "invalidProductCodeError",
    message: "Código de produto inexistente.",
  };
}

export { invalidFileFormatError, invalidCsvHeaderError, invalidCsvDataError, invalidProductCodeError };

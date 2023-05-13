import { AplicationError } from "./protocol";

function invalidFileFormatError(): AplicationError {
  return {
    type: "invalidFileFormatError",
    message: "Tipo de arquivo inválido. Somente são aceitos arquivos .csv",
  };
}

export { invalidFileFormatError };

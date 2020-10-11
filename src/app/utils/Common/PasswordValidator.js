function PasswordValidator(e, setPasswordError, setPassword) {
  const {
    target: { value: typedPassword },
  } = e;

  //* Se não digitou nada sai da função sem ativar erro.
  if (!typedPassword) return setPasswordError(null);

  //* Validação do tamanho da senha
  if (typedPassword.length < 4) {
    return setPasswordError('Digite uma senha com no mínimo 4 caracteres');
  }

  //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
  setPasswordError(null);
  return setPassword(typedPassword);
}

export default PasswordValidator;
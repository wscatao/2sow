const EmailValidator = (e, setEmailError, setEmail) => {
  const {
    target: { value: typedEmail },
  } = e;

  //* Se não digitou nada sai da função sem ativar erro.
  if (!typedEmail) return setEmailError(null);

  //* Teste de regex de e-mail
  const validator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!validator.test(typedEmail)) {
    return setEmailError('Você digitou um e-mail inválido');
  }

  //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
  setEmailError(null);
  return setEmail(typedEmail);
};

export default EmailValidator;

import React, { useEffect, useState } from 'react';
import { Container, Form, Segment, Button } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';

import TopBar from '../components/TopBar';

export default function Register() {
  const [userLogin, setUserLogin] = useState(false);
  const [nome, setNome] = useState(null);
  const [cpf, setCPF] = useState(null);
  const [email, setEmail] = useState(null);
  const [cep, setCep] = useState(null);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const emailValidator = (e) => {
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

  const findCEP = (cep) => {
    
  };

  useEffect(() => {
    if (localStorage.getItem('token')) setUserLogin(true);
  }, []);

  return (
    <div>
      {userLogin ? <TopBar /> : null}
      <Container style={{ marginTop: '7em' }}>
        <Segment raised>
          <Form>
            <Form.Group>
              <Form.Input
                required
                label="Nome"
                placeholder="Digite seu nome"
                width={8}
                onChange={(e) => setNome(e.target.value)}
              />
              <Form.Input
                required
                label="CPF"
                placeholder="Digite seu CPF"
                width={8}
              >
                <MaskedInput
                  mask={[
                    /[0-9]/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="123.456.789-10"
                  onChange={(e) => setCPF(e.target.value)}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                label="Email"
                placeholder="Digite seu e-mail"
                width={12}
                onBlur={(e) => emailValidator(e)}
                error={emailError}
              />
              <Form.Input required label="CEP" width={4}>
                <MaskedInput
                  mask={[
                    /[0-9]/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="00000-000"
                  onBlur={(e) => findCEP(e.target.value)}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                label="Rua"
                placeholder="Logradouro"
                width={12}
                onChange={(e) => setRua(e.target.value)}
              />
              <Form.Input
                required
                label="Número"
                placeholder="Número"
                width={4}
                onChange={(e) => setNumero(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                label="Bairro"
                placeholder="Bairro"
                width={8}
                onChange={(e) => setBairro(e.target.value)}
              />
              <Form.Input
                required
                label="Cidade"
                placeholder="Cidade"
                width={8}
                onChange={(e) => setCidade(e.target.value)}
              />
            </Form.Group>
            <Button
              content="Salvar"
              icon="save"
              labelPosition="left"
              color="green"
            />
            <Button
              content="Limpar"
              icon="eraser"
              labelPosition="left"
              color="grey"
            />
          </Form>
        </Segment>
      </Container>
    </div>
  );
}

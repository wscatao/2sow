import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Icon,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from 'semantic-ui-react';

import GenerateToken from '../utils/Login/GenerateToken';
import '../css/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const history = useHistory();

  const emailValidator = (e) => {
    const {
      target: { value: typedEmail },
    } = e;

    //* Se não digitou nada sai da função sem ativar erro.
    if (!typedEmail) {
      setEmailError(null);
      return undefined;
    }

    //* Regex de e-mail
    const validator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!validator.test(typedEmail)) {
      return setEmailError('Você digitou um e-mail inválido');
    }

    //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
    setEmailError(null);
    return setEmail(typedEmail);
  };

  function passwordValidator(e) {
    const {
      target: { value: typedPassword },
    } = e;

    //* Se não digitou nada sai da função sem ativar erro.
    if (!typedPassword) {
      setPasswordError(null);
      return undefined;
    }

    //* Validação do tamanho da senha
    if (typedPassword.length < 4) {
      return setPasswordError('Digite uma senha com no mínimo 4 caracteres');
    }

    //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
    setPasswordError(null);
    return setPassword(typedPassword);
  }

  const login = () => {
    const token = GenerateToken();
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/listing');
  };

  return (
    <Grid>
      <Grid.Row stretched>
        <Grid.Column
          className="bglogin"
          computer={10}
          color="red"
          only="computer"
        />
        <Grid.Column computer={6} mobile={16}>
          <Grid
            textAlign="center"
            style={{ height: '100vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                <Icon name="users" circular /> Login
              </Header>
              <Form size="large">
                <Segment raised>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Endereço de e-mail"
                    onBlur={(e) => emailValidator(e)}
                    error={emailError}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Senha"
                    type="password"
                    onBlur={(e) => passwordValidator(e)}
                    error={passwordError}
                  />

                  <Button
                    disabled={
                      !email || !password || emailError || passwordError
                    }
                    color="orange"
                    fluid
                    size="large"
                    onClick={() => login()}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Novo usuário? <Link to="/register">Crie sua conta</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

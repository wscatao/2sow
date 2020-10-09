import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Icon, Header, Form, Segment, Button } from 'semantic-ui-react';

import GenerateToken from '../utils/Login/GenerateToken';
import EmailValidator from '../utils/Common/EmailValidator';
import PasswordValidator from '../utils/Common/PasswordValidator';
import '../css/Login.css';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const history = useHistory();

  const login = () => {
    const token = GenerateToken();
    localStorage.setItem('token', JSON.stringify(token));
    return history.push('/home');
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
                    onBlur={(e) => EmailValidator(e, setEmailError, setEmail)}
                    error={emailError}
                    tabIndex="0"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Senha"
                    type="password"
                    onBlur={(e) =>
                      PasswordValidator(e, setPasswordError, setPassword)
                    }
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
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

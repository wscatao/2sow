import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Icon,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from 'semantic-ui-react';

import '../css/Login.css';

export default function Login() {
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
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Senha"
                    type="password"
                  />

                  <Button color="orange" fluid size="large">
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

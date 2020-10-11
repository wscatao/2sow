import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Confirm,
  Grid,
  Icon,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import Logo from '../images/logo.png';

export default function TopBar() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const handleCancel = () => {
    return setConfirmOpen(false);
  };

  const handleOnConfirm = () => {
    setConfirmOpen(false);
    history.push('/');
    return localStorage.removeItem('token');
  };

  const handleClick = (handler) => {
    return history.push(`/${handler}`);
  };

  return (
    <Grid>
      <Grid.Row only="computer">
        <Menu fixed="top" size="large" inverted>
          <Container>
            <Menu.Item
              as="a"
              header
              onClick={() => handleClick('home')}
              data-testid="Logo"
            >
              <img
                src={Logo}
                alt="Logo 2SOW"
                style={{ marginRight: '1.5em' }}
              />
              User Manager
            </Menu.Item>
            <Menu.Item
              onClick={() => handleClick('register')}
              data-testid="NovoUsuario"
            >
              Criar Usuário
            </Menu.Item>
            <Menu.Item
              onClick={() => handleClick('home')}
              data-testid="ListaUsuario"
            >
              Listagem de Usuários
            </Menu.Item>
            <Menu.Item position="right">
              <Button
                color="red"
                onClick={() => setConfirmOpen(true)}
                data-testid="BotaoSair"
              >
                Sair
              </Button>
              <Confirm
                open={confirmOpen}
                content="Tem certeza que deseja sair?"
                cancelButton="Cancelar"
                confirmButton="Sair"
                onCancel={handleCancel}
                onConfirm={handleOnConfirm}
                data-testid="AvisoSair"
              />
            </Menu.Item>
          </Container>
        </Menu>
      </Grid.Row>
      <Grid.Row only="mobile">
        <Menu icon fixed="top" size="large" inverted>
          <Container>
            <Menu.Item
              as="a"
              header
              onClick={() => handleClick('home')}
              data-testid="Logo"
            >
              <img
                src={Logo}
                alt="Logo 2SOW"
                style={{ marginRight: '1.5em' }}
              />
            </Menu.Item>
            <Menu.Item
              onClick={() => handleClick('register')}
              data-testid="NovoUsuario"
            >
              <Icon name="add user" />
            </Menu.Item>

            <Menu.Item
              onClick={() => handleClick('home')}
              data-testid="ListaUsuario"
            >
              <Icon name="list" />
            </Menu.Item>

            <Menu.Item
              color="red"
              onClick={() => setConfirmOpen(true)}
              data-testid="BotaoSair"
            >
              <Icon name="log out" />
            </Menu.Item>
          </Container>
        </Menu>
      </Grid.Row>
    </Grid>
  );
}

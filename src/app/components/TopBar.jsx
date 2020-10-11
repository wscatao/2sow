import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Container, Button, Confirm } from 'semantic-ui-react';

import Logo from '../images/logo.png';

export default function TopBar() {
  const [confirmOpen, setConfirmOpen] = useState(false);
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
    <Menu fixed="top" size="large" inverted stackable>
      <Container>
        <Menu.Item
          as="a"
          header
          onClick={() => handleClick('home')}
          data-testid="Logo"
        >
          <img src={Logo} alt="Logo 2SOW" style={{ marginRight: '1.5em' }} />
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
            fluid
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
  );
}

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Container, Dropdown, Button, Confirm } from 'semantic-ui-react';

import Logo from '../images/logo.png';

export default function TopBar() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const history = useHistory();

  const handleCancel = () => {
    return setConfirmOpen(false);
  };

  const handleOnConfirm = () => {
    localStorage.removeItem('token');
    setConfirmOpen(false);
    return history.push('/');
  };

  const handleClick = (handler) => {
    if (handler === 'edit') return history.push(`/${handler}`);
    return history.push(`/${handler}`);
  };

  return (
    <Menu fixed="top" size="large" inverted stackable>
      <Container>
        <Menu.Item as="a" header onClick={() => handleClick('home')}>
          <img src={Logo} alt="Logo 2SOW" style={{ marginRight: '1.5em' }} />
          User Manager
        </Menu.Item>
        <Dropdown item simple text="Opções">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick('edit')}>
              Editar Usuário
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('register')}>
              Criar Usuário
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item onClick={() => handleClick('home')}>
          Listagem de Usuários
        </Menu.Item>
        <Menu.Item position="right">
          <Button color="red" fluid onClick={() => setConfirmOpen(true)}>
            Sair
          </Button>
          <Confirm
            open={confirmOpen}
            content="Tem certeza que deseja sair?"
            cancelButton="Cancelar"
            confirmButton="Sair"
            onCancel={handleCancel}
            onConfirm={handleOnConfirm}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

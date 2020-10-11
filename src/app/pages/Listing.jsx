import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Menu,
  Table,
  Container,
  Button,
  Dimmer,
  Loader,
  Segment,
  Dropdown,
  Input,
  Confirm,
} from 'semantic-ui-react';

import TopBar from '../components/TopBar';
import {
  GetPageQtd,
  GetUsersByPage,
  GetUsersByParams,
} from '../utils/Listing/GetUsers';
import DeleteUser from '../utils/Listing/DeleteUser';

export default function Listing() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [qtdPags, setQtdPags] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [queryParams, setQueryParams] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selecForExc, setSelecForExc] = useState(null);
  const options = [
    { key: 'nome', text: 'Nome', value: 'nome_like' },
    { key: 'cpf', text: 'CPF', value: 'cpf_like' },
    { key: 'email', text: 'Email', value: 'email_like' },
    { key: 'cidade', text: 'Cidade', value: 'endereco.cidade_like' },
  ];

  const handlePage = async (val) => {
    const getPage = page;
    if (val === '-1' && page === 1) return undefined;

    if (val === '-1') {
      setLoading(true);
      const people = await GetUsersByPage(getPage - page);
      setPage(getPage - 1);
      setUsers([...people]);
      return setLoading(false);
    }

    if (val === '+1' && page === qtdPags.length) return undefined;

    if (val === '+1') {
      setLoading(true);
      const people = await GetUsersByPage(getPage + page);
      setPage(getPage + page);
      setUsers([...people]);
      return setLoading(false);
    }

    setLoading(true);
    const people = await GetUsersByPage(val);
    setPage(val);
    setUsers([...people]);
    return setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const response = await GetUsersByParams(queryParams, selectedOption);
    const arrPags = [];

    for (let i = 1; i <= response.pg; i += 1) {
      arrPags.push(i);
    }

    setQtdPags(arrPags);
    setUsers([...response.data]);
    return setLoading(false);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    await DeleteUser(id);
    //* Primeiro é setado a quantidade de páginas da tabela
    //* Foi setado para exibir 10 linhas por página.
    const qtdPeople = await GetPageQtd();
    const arrPags = [];
    for (let i = 1; i <= qtdPeople; i += 1) {
      arrPags.push(i);
    }
    setQtdPags(arrPags);

    //* Depois de setado o estado de páginas, é feito a requisição para a primeira página.
    const people = await GetUsersByPage(page);
    setUsers([...people]);
    setLoading(false);
    setOpenConfirm(false);
  };

  useEffect(() => {
    const local = localStorage.getItem('token');
    if (!local) history.push('/');

    async function mountPagAndUsers() {
      setLoading(true);
      //* Primeiro é setado a quantidade de páginas da tabela
      //* Foi setado para exibir 10 linhas por página.
      const qtdPeople = await GetPageQtd();
      const arrPags = [];
      for (let i = 1; i <= qtdPeople; i += 1) {
        arrPags.push(i);
      }
      setQtdPags(arrPags);

      //* Depois de setado o estado de páginas, é feito a requisição para a primeira página.
      const people = await GetUsersByPage(page);
      setUsers([...people]);
      return setLoading(false);
    }

    mountPagAndUsers();
  }, [history, page]);

  return (
    <div>
      <TopBar />
      <Container style={{ marginTop: '10em' }}>
        <Segment raised>
          <Input
            type="text"
            onChange={(e) => setQueryParams(e.target.value)}
            placeholder="Buscar..."
            action
            fluid
          >
            <input />
            <Dropdown
              selection
              placeholder="Escolha um filtro"
              options={options}
              value={selectedOption}
              onChange={(e, { value }) => setSelectedOption(value)}
            />
            <Button color="orange" type="button" onClick={() => handleSearch()}>
              Buscar
            </Button>
          </Input>
        </Segment>
        <Table fixed celled striped color="orange">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>CPF</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell collapsing>{user.nome}</Table.Cell>
                  <Table.Cell collapsing>{user.cpf}</Table.Cell>
                  <Table.Cell collapsing>{user.email}</Table.Cell>
                  <Table.Cell collapsing>{user.endereco.cidade}</Table.Cell>
                  <Table.Cell collapsing>
                    <Button
                      icon
                      color="orange"
                      value={user.id}
                      onClick={(e, { value }) =>
                        history.push(`/update/${value}`)
                      }
                    >
                      <Icon name="pencil" />
                    </Button>
                    <Button
                      icon
                      color="black"
                      value={user.id}
                      onClick={(e, { value }) => {
                        setSelecForExc(value);
                        setOpenConfirm(true);
                      }}
                    >
                      <Icon name="trash alternate" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            <Confirm
              header="Excluir usuário"
              content="Tem certeza que deseja excluir"
              cancelButton="Cancelar"
              confirmButton="Sim"
              size="large"
              value={selecForExc}
              open={openConfirm}
              onCancel={() => setOpenConfirm(false)}
              onConfirm={(e, { value }) => deleteUser(value)}
            />
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Menu floated="right" pagination>
                  <Menu.Item onClick={() => handlePage('-1')}>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  {qtdPags &&
                    qtdPags.length > 1 &&
                    qtdPags.map((n) => (
                      <Menu.Item
                        key={n}
                        onClick={() => handlePage(parseInt(n, 10))}
                      >
                        {n}
                      </Menu.Item>
                    ))}
                  <Menu.Item onClick={() => handlePage('+1')}>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Dimmer active={loading} page>
          <Loader size="large" inverted>
            Carregando Dados...
          </Loader>
        </Dimmer>
      </Container>
    </div>
  );
}

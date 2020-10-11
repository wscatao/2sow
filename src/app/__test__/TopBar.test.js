/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Register from '../pages/Register';

require('jest-localstorage-mock');

const component = <Register />;
const route = '/register';

describe('Verifica se ao acessar a tela de Registro existe um TopBar', () => {
  it('Verifica tem um logo', () => {
    const { getByTestId } = renderWithRouter(component, { route });
    const logo = getByTestId('Logo');
    expect(logo).toBeInTheDocument();
  });
});

describe('Verifica se ao clicar nos botões sou levado para a rota certa', () => {
  it('Se vou para a rota /home', async () => {
    const { getByTestId, history } = renderWithRouter(component, { route });
    const logo = getByTestId('Logo');

    expect(logo).toBeInTheDocument();
    userEvent.click(logo);

    await waitFor(() => expect(history.location.pathname).toBe('/home'));
  });

  it('Se vou para a rota /register', async () => {
    const { getByTestId, history } = renderWithRouter(component, { route });
    const novoUsuario = getByTestId('NovoUsuario');

    expect(novoUsuario).toBeInTheDocument();
    userEvent.click(novoUsuario);

    await waitFor(() => expect(history.location.pathname).toBe('/register'));
  });

  it('Se vou para a rota /home ao clicar em listagem', async () => {
    const { getByTestId, history } = renderWithRouter(component, { route });
    const listarUsuarios = getByTestId('ListaUsuario');

    expect(listarUsuarios).toBeInTheDocument();
    userEvent.click(listarUsuarios);

    await waitFor(() => expect(history.location.pathname).toBe('/home'));
  });

  it('Se ao clicar em Sair recebo um aviso', async () => {
    const { getByTestId } = renderWithRouter(component, {
      route,
    });
    const botaoSair = getByTestId('BotaoSair');

    expect(botaoSair).toBeInTheDocument();
    userEvent.click(botaoSair);

    await waitFor(() => expect(getByTestId('AvisoSair')).toBeInTheDocument());
  });
});

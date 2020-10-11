/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

const component = <Login />;
const emailInvalido = 'wscataoSemArroba';
const senhaInvalida = 'abc';
const emailValido = 'wscatao@gmail.com';
const senhaValida = 'abc12345';
require('jest-localstorage-mock');

beforeEach(() => {
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
});

describe('Renderiza a tela de login', () => {
  it('Verifica se a rota que estou é /', () => {
    const { history } = renderWithRouter(component);
    const myRoute = history.location.pathname;
    expect(myRoute).toBe('/');
  });

  it('Verifica se existe titulo Login na página', () => {
    const { getByTestId } = renderWithRouter(component);
    const loginTitle = getByTestId('title-login');
    expect(loginTitle).toBeInTheDocument();
    expect(loginTitle.textContent).toBe(' Login');
  });

  it('Verifica se existe inputs e botão para Login', () => {
    const { getByRole, getByPlaceholderText } = renderWithRouter(component);
    const inputEmail = getByPlaceholderText(/endereço de e-mail/i);
    const inputPassword = getByPlaceholderText(/senha/i);
    const buttonLogin = getByRole('button', { name: /login/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });
});

describe('Verifica se existem mensagens de erro ao digitar dados inválidos', () => {
  it('ao digitar um e-mail inválido uma mensagem de erro deve aparecer', () => {
    const { getByRole, getByTestId } = renderWithRouter(component);
    const input = getByTestId('inputEmail');
    const inputEmail = input.children[0];

    expect(inputEmail).toBeInTheDocument();

    inputEmail.focus();
    userEvent.type(inputEmail, emailInvalido);
    userEvent.tab();

    expect(inputEmail).toHaveValue(emailInvalido);
    expect(
      getByRole('alert', /Você digitou um e-mail inválido/i),
    ).toBeInTheDocument();
  });

  it('ao digitar uma senha inválida uma mensagem de erro deve aparecer', () => {
    const { getByRole, getByTestId } = renderWithRouter(component);
    const input = getByTestId('inputPassword');
    const inputSenha = input.children[0];

    expect(inputSenha).toBeInTheDocument();

    inputSenha.focus();
    userEvent.type(inputSenha, senhaInvalida);
    userEvent.tab();

    expect(inputSenha).toHaveValue(senhaInvalida);
    expect(
      getByRole('alert', /Digite uma senha com no mínimo 4 caracteres/i),
    ).toBeInTheDocument();
  });

  it('verificar o botão de login está desabilitado caso haja erro', () => {
    const { getByRole, getByTestId } = renderWithRouter(component);
    const input = getByTestId('inputPassword');
    const button = getByTestId('buttonLogin');
    const inputSenha = input.children[0];

    expect(inputSenha).toBeInTheDocument();

    inputSenha.focus();
    userEvent.type(inputSenha, senhaInvalida);
    userEvent.tab();

    expect(inputSenha).toHaveValue(senhaInvalida);
    expect(
      getByRole('alert', /Digite uma senha com no mínimo 4 caracteres/i),
    ).toBeInTheDocument();
    expect(button).toHaveProperty('disabled');
  });

  it('Verifica se o botão fica habilitado ao digitar dados válidos', () => {
    const { getByTestId } = renderWithRouter(component);
    const inputS = getByTestId('inputPassword');
    const inputSenha = inputS.children[0];
    const inputE = getByTestId('inputEmail');
    const inputEmail = inputE.children[0];
    const button = getByTestId('buttonLogin');

    inputEmail.focus();
    userEvent.type(inputEmail, emailValido);
    userEvent.tab();
    userEvent.type(inputSenha, senhaValida);

    expect(inputEmail).toHaveValue(emailValido);
    expect(inputSenha).toHaveValue(senhaValida);
    expect(button).not.toHaveAttribute('disabled');
  });
});

describe('Verifica que ao fazer login é gerado token', () => {
  it('Verifica token em localStorage', () => {
    const { getByTestId } = renderWithRouter(component);
    const inputS = getByTestId('inputPassword');
    const inputSenha = inputS.children[0];
    const inputE = getByTestId('inputEmail');
    const inputEmail = inputE.children[0];
    const button = getByTestId('buttonLogin');

    inputEmail.focus();
    userEvent.type(inputEmail, emailValido);
    userEvent.tab();
    userEvent.type(inputSenha, senhaValida);

    expect(inputEmail).toHaveValue(emailValido);
    expect(inputSenha).toHaveValue(senhaValida);
    expect(button).not.toHaveAttribute('disabled');

    userEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem('token')).not.toBeNull();
  });
});

describe('Verifica se vou para tela de home', () => {
  it('Simulação de um login válido', () => {
    const { getByTestId, history } = renderWithRouter(component);
    const inputS = getByTestId('inputPassword');
    const inputSenha = inputS.children[0];
    const inputE = getByTestId('inputEmail');
    const inputEmail = inputE.children[0];
    const button = getByTestId('buttonLogin');

    inputEmail.focus();
    userEvent.type(inputEmail, emailValido);
    userEvent.tab();
    userEvent.type(inputSenha, senhaValida);

    expect(inputEmail).toHaveValue(emailValido);
    expect(inputSenha).toHaveValue(senhaValida);
    expect(button).not.toHaveAttribute('disabled');

    userEvent.click(button);
    expect(history.location.pathname).toBe('/home');
  });
});

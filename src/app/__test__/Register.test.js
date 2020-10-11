/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/dom';

const component = <Register />;
const route = '/register';
const fakeToken = 'token fake';
const emailInvalido = 'wscataoSemArroba';
// const senhaInvalida = 'abc';
// const emailValido = 'wscatao@gmail.com';
// const senhaValida = 'abc12345';
require('jest-localstorage-mock');

beforeAll(() => {
  localStorage.setItem('token', fakeToken);
});

describe('Verifica que estou na página de Registro', () => {
  it('Renderiza a página de registro', () => {
    const { history } = renderWithRouter(component, { route });
    expect(history.location.pathname).toBe(route);
  });
});

describe('Verifica se existem os inputs para cadastro', () => {
  it('Verifica se existe inputNome', () => {
    const { getByLabelText } = renderWithRouter(component, { route });
    const inputNome = getByLabelText(/Nome/i);
    expect(inputNome).toBeInTheDocument();
  });

  it('Verifica se existe CPF', () => {
    const { getByTestId } = renderWithRouter(component, { route });
    const cpf = getByTestId('inputCpf');
    expect(cpf).toBeInTheDocument();
  });

  it('Verifica se existe Email', () => {
    const { getByPlaceholderText } = renderWithRouter(component, { route });
    const emailInput = getByPlaceholderText(/Digite seu e-mail/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se existe validação no e-mail', () => {
    const { getByPlaceholderText, getByRole } = renderWithRouter(component, {
      route,
    });
    const emailInput = getByPlaceholderText(/Digite seu e-mail/i);
    expect(emailInput).toBeInTheDocument();

    emailInput.focus();
    userEvent.type(emailInput, emailInvalido);
    userEvent.tab();

    expect(
      getByRole('alert', /Você digitou um e-mail inválido/i),
    ).toBeInTheDocument();
  });

  it('Verifica se existe CEP', () => {
    const { getByTestId } = renderWithRouter(component, { route });
    const cep = getByTestId('CEP');
    expect(cep).toBeInTheDocument();
  });

  it('Verifica se existe Rua', () => {
    const { getByPlaceholderText } = renderWithRouter(component, { route });
    const ruaInput = getByPlaceholderText(/Logradouro/i);
    expect(ruaInput).toBeInTheDocument();
  });

  it('Verifica se existe numero', () => {
    const { getByPlaceholderText } = renderWithRouter(component, { route });
    const inputNumero = getByPlaceholderText(/Número/i);
    expect(inputNumero).toBeInTheDocument();
  });

  it('Verifica se existe complemento', () => {
    const { getByPlaceholderText } = renderWithRouter(component, { route });
    const inputCompl = getByPlaceholderText(/Complemento/i);
    expect(inputCompl).toBeInTheDocument();
  });

  it('Verifica se existe Bairro', () => {
    const { getByPlaceholderText } = renderWithRouter(component, { route });
    const inputBairro = getByPlaceholderText(/Bairro/i);
    expect(inputBairro).toBeInTheDocument();
  });

  it('Verifica se existe Cidade', () => {
    const { getByPlaceholderText } = renderWithRouter(component, { route });
    const inputCidade = getByPlaceholderText(/Cidade/i);
    expect(inputCidade).toBeInTheDocument();
  });
});

describe('Verifica se ao digitar um CEP válido os campos são preenchidos', () => {
  
});

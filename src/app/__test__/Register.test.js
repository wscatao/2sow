/* eslint-disable no-return-await */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register';
import renderWithRouter from './renderWithRouter';

const component = <Register />;
const route = '/register';
const fakeToken = 'token fake';
const nome = 'Willy de Souza Catão';
const cpf = '230.713.528-67';
const emailValido = 'wscatao@gmail.com';
const emailInvalido = 'wscataoSemArroba';
const cep = '09120450';
const logradouro = 'Rua Corcovado';
const localidade = 'Santo André';
const bairro = 'Vila Amábile Pezzolo';

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
    const inputCpf = getByTestId('inputCpf');
    expect(inputCpf).toBeInTheDocument();
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
    const cepInput = getByTestId('CEP');
    expect(cepInput).toBeInTheDocument();
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

describe('Verifica funcionalidade de autopreencher endereço', () => {
  it('Simula comportamento de digitar um Cep válido', async () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(component, {
      route,
    });
    const input = getByTestId('CEP');
    const cepInput = input.children[0];
    const ruaInput = getByPlaceholderText(/Logradouro/i);
    const inputBairro = getByPlaceholderText(/Bairro/i);
    const inputCidade = getByPlaceholderText(/Cidade/i);

    expect(ruaInput).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(inputCidade).toBeInTheDocument();
    expect(inputBairro).toBeInTheDocument();

    cepInput.focus();
    userEvent.type(cepInput, cep);

    expect(cepInput).toHaveValue('09120-450');

    userEvent.tab();

    await act(
      async () => await waitFor(() => expect(ruaInput).toHaveValue(logradouro)),
    );
    await act(
      async () =>
        await waitFor(() => expect(inputCidade).toHaveValue(localidade)),
    );
    await act(
      async () => await waitFor(() => expect(inputBairro).toHaveValue(bairro)),
    );
  });
});

describe('Verifica os avisos ao preencher o registro', () => {
  it('Simula a inclusão de um registro sem campo obrigatório', async () => {
    const {
      getByLabelText,
      getByTestId,
      getByPlaceholderText,
    } = renderWithRouter(component, { route });

    const inputNome = getByLabelText(/Nome/i);
    const divCpf = getByTestId('inputCpf');
    const inputCpf = divCpf.children[0];
    const emailInput = getByPlaceholderText(/Digite seu e-mail/i);
    const divCep = getByTestId('CEP');
    const cepInput = divCep.children[0];
    const ruaInput = getByPlaceholderText(/Logradouro/i);
    const inputBairro = getByPlaceholderText(/Bairro/i);
    const inputCidade = getByPlaceholderText(/Cidade/i);
    const saveButton = getByTestId('saveButton');

    expect(emailInput).toBeInTheDocument();
    expect(inputNome).toBeInTheDocument();
    expect(inputCpf).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(ruaInput).toBeInTheDocument();
    expect(inputCidade).toBeInTheDocument();
    expect(inputBairro).toBeInTheDocument();

    //* Digita os dados nos inputs
    inputNome.focus();
    userEvent.type(inputNome, nome);
    userEvent.tab();
    userEvent.type(inputCpf, cpf);
    userEvent.tab();
    userEvent.type(emailInput, emailValido);
    userEvent.tab();
    userEvent.type(cepInput, cep);
    userEvent.tab();

    expect(inputNome).toHaveValue(nome);
    expect(inputCpf).toHaveValue(cpf);
    expect(emailInput).toHaveValue(emailValido);

    await act(
      async () => await waitFor(() => expect(ruaInput).toHaveValue(logradouro)),
    );
    await act(
      async () =>
        await waitFor(() => expect(inputCidade).toHaveValue(localidade)),
    );
    await act(
      async () => await waitFor(() => expect(inputBairro).toHaveValue(bairro)),
    );

    saveButton.focus();
    userEvent.click(saveButton);

    await act(async () => {
      await waitFor(() => expect(getByTestId('msgErr')).toBeInTheDocument());
    });
  });

  it('Simula a inclusão de um regitro e se recebe msg de sucesso', async () => {
    const {
      getByLabelText,
      getByTestId,
      getByPlaceholderText,
    } = renderWithRouter(component, { route });

    const inputNome = getByLabelText(/Nome/i);
    const divCpf = getByTestId('inputCpf');
    const inputCpf = divCpf.children[0];
    const emailInput = getByPlaceholderText(/Digite seu e-mail/i);
    const divCep = getByTestId('CEP');
    const cepInput = divCep.children[0];
    const ruaInput = getByPlaceholderText(/Logradouro/i);
    const inputBairro = getByPlaceholderText(/Bairro/i);
    const inputCidade = getByPlaceholderText(/Cidade/i);
    const saveButton = getByTestId('saveButton');
    const inputNumero = getByPlaceholderText(/Número/i);

    expect(emailInput).toBeInTheDocument();
    expect(inputNome).toBeInTheDocument();
    expect(inputCpf).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(ruaInput).toBeInTheDocument();
    expect(inputCidade).toBeInTheDocument();
    expect(inputBairro).toBeInTheDocument();
    expect(inputNumero).toBeInTheDocument();

    //* Digita os dados nos inputs
    inputNome.focus();
    userEvent.type(inputNome, nome);
    userEvent.tab();
    userEvent.type(inputCpf, cpf);
    userEvent.tab();
    userEvent.type(emailInput, emailValido);
    userEvent.tab();
    userEvent.type(cepInput, cep);
    userEvent.tab();

    expect(inputNome).toHaveValue(nome);
    expect(inputCpf).toHaveValue(cpf);
    expect(emailInput).toHaveValue(emailValido);

    await act(
      async () => await waitFor(() => expect(ruaInput).toHaveValue(logradouro)),
    );
    await act(
      async () =>
        await waitFor(() => expect(inputCidade).toHaveValue(localidade)),
    );
    await act(
      async () => await waitFor(() => expect(inputBairro).toHaveValue(bairro)),
    );

    inputNumero.focus();
    userEvent.type(inputNumero, '59');
    expect(inputNumero).toHaveValue('59');

    saveButton.focus();
    userEvent.click(saveButton);

    await act(async () => {
      await waitFor(() => expect(getByTestId('msgSuc')).toBeInTheDocument());
    });
  });
});

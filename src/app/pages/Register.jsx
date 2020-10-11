import React, { useEffect, useState } from 'react';
import { Container, Form, Segment, Button, Message } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { useHistory } from 'react-router-dom';

import TopBar from '../components/TopBar';
import EmailValidator from '../utils/Common/EmailValidator';
import FindCep from '../utils/Common/FindCep';
import SaveUser from '../utils/Register/SaveUser';

export default function Register() {
  const [nome, setNome] = useState(null);
  const [cpf, setCPF] = useState(null);
  const [email, setEmail] = useState(null);
  const [cep, setCep] = useState(null);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [complemento, setComplemento] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formErr, setFormErr] = useState(false);
  const [formSuc, setFormSuc] = useState(false);
  const [bodyMsg, setBodyMsg] = useState(null);
  const [headerMsg, setHeaderMsg] = useState(null);
  const history = useHistory();

  const findCEP = async (formCep) => {
    if (!formCep) return undefined;

    setFormLoading(true);
    const address = await FindCep(formCep);

    if (address.erro) {
      setFormLoading(false);
      setFormErr(true);
      setBodyMsg('Não conseguimos localizar o seu CEP.');
      setHeaderMsg('Houve um erro!');
      return setCep(formCep.replace('-', ''));
    }

    setBairro(address.bairro);
    setCidade(address.localidade);
    setRua(address.logradouro);
    setCep(formCep.replace('-', ''));
    return setFormLoading(false);
  };

  const clearForm = () => {
    setNome('');
    setCPF('');
    setEmail('');
    setCep('');
    setRua('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
  };

  const save = async () => {
    setFormLoading(true);

    if (
      !nome ||
      !cpf ||
      !email ||
      !cep ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade
    ) {
      setFormLoading(false);
      setFormErr(true);
      setHeaderMsg('Atenção!');
      return setBodyMsg('Há campos obrigatórios nãp preenchidos');
    }

    setFormErr(false);

    const newUser = {
      nome,
      cpf,
      email,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
    };

    const saveStatus = await SaveUser(newUser);
    if (saveStatus === 201) {
      setFormLoading(false);
      clearForm();
      setFormSuc(true);
      setBodyMsg('Usuário cadastrado com sucesso!');
      return setHeaderMsg('Obrigado');
    }
  };

  useEffect(() => {
    const local = localStorage.getItem('token');
    if (!local) return history.push('/');
    return undefined;
  }, [history]);

  return (
    <div>
      <TopBar />
      <Container style={{ marginTop: '7em' }}>
        <Segment raised>
          <Form loading={formLoading} error={formErr} success={formSuc}>
            <Form.Group>
              <Form.Input
                required
                label="Nome"
                placeholder="Digite seu nome"
                width={8}
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
              <Form.Input
                required
                label="CPF"
                placeholder="Digite seu CPF"
                width={8}
              >
                <MaskedInput
                  mask={[
                    /[0-9]/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="123.456.789-10"
                  onChange={(e) => setCPF(e.target.value)}
                  value={cpf}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                label="Email"
                placeholder="Digite seu e-mail"
                width={12}
                onBlur={(e) => EmailValidator(e, setEmailError, setEmail)}
                error={emailError}
                value={email}
              />
              <Form.Input required label="CEP" width={4}>
                <MaskedInput
                  mask={[
                    /[0-9]/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="00000-000"
                  onBlur={(e) => findCEP(e.target.value)}
                  value={cep}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                label="Rua"
                placeholder="Logradouro"
                width={10}
                onChange={(e) => setRua(e.target.value)}
                value={rua}
              />

              <Form.Input
                required
                label="Número"
                placeholder="Número"
                width={3}
                onChange={(e) => setNumero(e.target.value)}
                value={numero}
              />

              <Form.Input
                label="Complemento"
                placeholder="Complemento"
                width={3}
                onChange={(e) => setComplemento(e.target.value)}
                value={complemento}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                label="Bairro"
                placeholder="Bairro"
                width={8}
                onChange={(e) => setBairro(e.target.value)}
                value={bairro}
              />
              <Form.Input
                required
                label="Cidade"
                placeholder="Cidade"
                width={8}
                onChange={(e) => setCidade(e.target.value)}
                value={cidade}
              />
            </Form.Group>
            <Message error header={headerMsg} content={bodyMsg} />
            <Message success header={headerMsg} content={bodyMsg} />
            <Button
              content="Salvar"
              icon="save"
              labelPosition="left"
              color="green"
              onClick={() => save()}
            />
            <Button
              content="Limpar"
              icon="eraser"
              labelPosition="left"
              color="grey"
              onClick={() => clearForm()}
            />
          </Form>
        </Segment>
      </Container>
    </div>
  );
}

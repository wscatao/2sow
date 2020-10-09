const axios = require('axios').default;

const SaveUser = async (payload) => {
  const {
    nome,
    cpf,
    email,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    complemento,
  } = payload;

  try {
    const newUser = await axios.post(`http://localhost:5000/usuarios`, {
      nome,
      cpf,
      email,
      endereco: { cep, rua, numero, complemento, bairro, cidade },
    });
    return newUser.status;
  } catch (err) {
    return err.response;
  }
};

export default SaveUser;

const axios = require('axios').default;

const DispatchUpdate = async (payload, id) => {
  const { nome, cpf, email, cep, rua, numero, bairro, cidade } = payload;

  const updatedUser = await axios.put(`http://localhost:5000/usuarios/${id}`, {
    nome,
    cpf,
    email,
    endereco: { cep, rua, numero, bairro, cidade },
  });
  return updatedUser.data;
};

export default DispatchUpdate;

const axios = require('axios').default;

const FindCep = async (cep) => {
  try {
    const tryFind = await axios.get(`http://viacep.com.br/ws/${cep}/json`);
    return tryFind.data;
  } catch (err) {
    return err.response;
  }
};

export default FindCep;

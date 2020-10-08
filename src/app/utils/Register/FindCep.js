const axios = require('axios').default;

const FindCep = async (cep) => {
  try {
    const tryFind = await axios.get(`http://viacep.com.br/ws/${cep}/json`);
    return tryFind.data;
  } catch (err) {
    const {
      response: { status, statusText },
    } = err;
    return { status, statusText };
  }
};

export default FindCep;

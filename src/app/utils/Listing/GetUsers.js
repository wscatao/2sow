const axios = require('axios').default;

const GetUsers = async () => {
  const users = await axios.get('http://localhost:5000/usuarios');
  return users.data;
};

export default GetUsers;

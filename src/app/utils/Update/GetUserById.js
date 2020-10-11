const axios = require('axios').default;

const GetUserById = async (id) => {
  const user = await axios.get(`http://localhost:5000/usuarios/${id}`);
  return user.data;
};

export default GetUserById;

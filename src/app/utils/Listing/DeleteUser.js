const axios = require('axios').default;

const DeleteUser = async (id) => {
  const del = await axios.delete(`http://localhost:5000/usuarios/${id}`);
  return del;
};

export default DeleteUser;

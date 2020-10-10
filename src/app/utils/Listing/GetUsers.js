const axios = require('axios').default;

export const GetPageQtd = async () => {
  const users = await axios.get('http://localhost:5000/usuarios');
  const { length } = users.data;
  return Math.ceil(length / 10);
};

export const GetUsersByPage = async (_page) => {
  const usersByPage = await axios.get('http://localhost:5000/usuarios', {
    params: {
      _page,
    },
  });
  return usersByPage.data;
};

export const GetUsersByParams = async (param, cond) => {
  const usersByParam = await axios.get(
    `http://localhost:5000/usuarios?${cond}=${param}`,
  );

  const { length } = usersByParam.data;
  const pages = Math.ceil(length / 10);

  return { data: usersByParam.data, pg: pages };
};

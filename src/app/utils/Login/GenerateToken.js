//* Create a token generator with the default settings:
const randtoken = require('rand-token');

const GenerateToken = () => {
  //* Generate a 16 character alpha-numeric token:
  const token = randtoken.generate(16);
  return token;
};

export default GenerateToken;

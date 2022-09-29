const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const currencyAPI = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export default currencyAPI;

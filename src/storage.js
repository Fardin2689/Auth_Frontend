const key = "authToken";

const storeToken = (authToken) => {
  localStorage.setItem(key, authToken);
};

const getToken = () => {
  const authToken = localStorage.getItem(key);
  return !authToken ? null : authToken;
};

const removeToken = () => {
  localStorage.removeItem(key);
};

// const getUser = () => {};

const exportedObject = {
  storeToken,
  getToken,
  removeToken,
};
export default exportedObject;

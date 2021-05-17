import apiClient from "./apiClient";

const signUp = (data) => apiClient.post("/auth/signup", data);
const signIn = (data) => apiClient.post("/auth/signin", data);
const session = () => apiClient.get("/auth/session");
const forgotPass = (data) => apiClient.post("/auth/forgotpassword", data);
const resetPass = (data, token) =>
  apiClient.post("/auth/resetpassword", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
const test = () => apiClient.get("/auth/test");

const exportedObject = {
  signUp,
  signIn,
  session,
  forgotPass,
  resetPass,
  test,
};

export default exportedObject;

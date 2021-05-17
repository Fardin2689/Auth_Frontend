import { create } from "apisauce";
import authStorage from "../storage";

const instance = create({
  baseURL: `http://localhost:4000`,
});

instance.addAsyncRequestTransform(async (request) => {
  const token = authStorage.getToken();
  if (!token) return;
  request.headers["Authorization"] = `Bearer ${token}`;
});

export default instance;

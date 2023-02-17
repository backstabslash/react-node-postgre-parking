import axios from "../axios";
import { useContext } from "react";
import AuthContext from "../components/context/authprovider";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);
  const refresh = async () => {
    const response = await axios.get("user/refresh", {
      withCredentials: true,
    });
    setAuth({
      username: response.data.username,
      accessToken: response.data.accessToken,
      role: response.data.role,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

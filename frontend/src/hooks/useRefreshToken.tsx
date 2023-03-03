import axios from "../axios";
import { setAuth } from "../redux/auth";
import { useDispatch } from "react-redux";

const useRefreshToken = (): (() => Promise<string>) => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("user/refresh", {
      withCredentials: true,
    });
    dispatch(
      setAuth({
        username: response.data.username,
        accessToken: response.data.accessToken,
        role: response.data.role,
      })
    );
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

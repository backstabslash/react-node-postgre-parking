import { refresh } from "../redux/auth";
import { useAppDispatch } from "../redux/hooks";

const useRefreshToken = (): (() => Promise<string | null>) => {
  const dispatch = useAppDispatch();
  const refreshToken = async () => {
    let accessToken = null;
    await dispatch(refresh())
      .unwrap()
      .then((token) => {
        accessToken = token.accessToken;
      })
      .catch((err) => err);
    return accessToken;
  };
  return refreshToken;
};

export default useRefreshToken;

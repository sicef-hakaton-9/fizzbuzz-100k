import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user.reducer";
import { ApiService } from "../services/api.service";
import { setAuthorizationHeader } from "../common/axios";

const AuthenticationMiddleware = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await ApiService.getInfoAsync();

      if (response.ok && response.data !== null) {
        dispatch(setUser(response.data));
        setAuthorizationHeader();
      }
      
    })();
  }, [dispatch]);

  return <></>;
};

export default AuthenticationMiddleware;

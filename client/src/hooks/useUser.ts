import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useUser = () => {
  const user = useSelector((state: RootState) => state.user.value);
  return user;
};

export default useUser;

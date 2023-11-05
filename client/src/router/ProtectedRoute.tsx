import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { setAuthorizationHeader } from "../common/axios";
import { ApiService } from "../services/api.service";

interface IComponentProps {
  component: JSX.Element;
}

const ProtectedRoute: React.FC<IComponentProps> = ({ component }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    const token = localStorage.getItem(ApiService.IdentityKey);

    const unauthorized = token === null && !user;

    setAuthorizationHeader();

    if (unauthorized) {
      return navigate("/sign-in");
    }

    setIsAuthorized(true);
  }, [user, navigate]);

  return <>{isAuthorized && component}</>;
};

export default ProtectedRoute;

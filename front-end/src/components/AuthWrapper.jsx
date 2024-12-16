// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLocal } from "../service/userLocal";

// eslint-disable-next-line react/prop-types
const AuthWrapper = ({ children }) => {
  // const { userID } = useSelector((state) => state.userReducer);
  const userID = JSON.parse(userLocal.getUserId());
  if (!userID) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default AuthWrapper;

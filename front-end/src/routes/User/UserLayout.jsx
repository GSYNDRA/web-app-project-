import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import AuthWrapper from "../../components/AuthWrapper";

const UserLayout = () => {
  return (
    <AuthWrapper>
      <div>
        <Header />
        <Outlet />
      </div>
    </AuthWrapper>
  );
};

export default UserLayout;

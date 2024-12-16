import { NavLink, useLocation, useNavigate } from "react-router-dom";
import bgMenu from "../assets/bgMenu.png";
import bgAboutContact from "../assets/bgAboutContact.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../service/userReducer/userReducer";
import { message } from "antd";

const Header = () => {
  const path = useLocation().pathname;
  const { roleID } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutAction());

    navigate("/auth/login");
    message.success("Logout success");
  };

  const pageName = path
    .replace("/user/", "")
    .replace("/admin/", "")
    .replace(/^\w/, (c) => c.toUpperCase());

  const isUser = path.startsWith("/user");
  const isHome = path === "/user/home";
  const isAboutOrContact = path === "/user/about" || path === "/user/contact";
  // const isAdmin = path.startsWith("/admin");
  const isAdmin = roleID == 2 ? true : false;

  const bgStyle =
    isUser && isHome ? "bg-black" : isUser ? "bg-cover bg-center" : "bg-none";
  const backgroundImage =
    isUser && isHome
      ? "none"
      : isUser && isAboutOrContact
      ? `url(${bgAboutContact})`
      : isUser
      ? `url(${bgMenu})`
      : "none";

  const navLinks = [
    { name: "Home", path: "/user/home" },
    { name: "Menu", path: "/user/menu" },
    { name: "About", path: "/user/about" },
    { name: "Contact", path: "/user/contact" },
  ];

  const adminLinks = [
    { name: "Home", path: "/admin/home" },
    { name: "Menu", path: "/admin/menu" },
    // { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Food Track", path: "/admin/food-track" },
  ];

  return (
    <div
      className={`p-12 pb-8 ${bgStyle}`}
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navigation Links */}
      <div className="flex justify-between">
        <div className="space-x-8 text-[24px] font-rufina">
          {(isAdmin ? adminLinks : navLinks).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={() =>
                path === link.path
                  ? "text-[#ADEBFF]"
                  : "text-white hover:text-[#ADEBFF] ease-in-out"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <div className="font-rufina text-[24px]">
          <button
            onClick={logout}
            className="hover:text-[#ADEBFF] ease-in-out text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Page Name */}
      {isUser && !isHome && (
        <div>
          <h1 className="text-center text-white text-[80px]">{pageName}</h1>
        </div>
      )}
    </div>
  );
};

export default Header;

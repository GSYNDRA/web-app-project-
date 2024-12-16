import { useNavigate } from "react-router-dom";
import img from "../assets/bghp.png";
import { Divider, Typography } from "antd";

const Homepage = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/auth/login");
  };
  return (
    <div className="bg-[#000011] flex w-screen h-screen justify-between">
      <div className="text-white w-1/2  align-middle pl-[200px] pt-[150px]">
        <Typography.Text className=" font-rufina text-[#F8AFA6] text-[66px]">
          Welcome To{" "}
        </Typography.Text>
        <br />{" "}
        <Typography.Text className=" font-rufina text-[#ADEBFF] text-[72px]">
          JD Restaurant
        </Typography.Text>
        <Divider />
        <Typography.Text className=" font-rufina text-[48px] text-white font-normal">
          JDへようこそ
        </Typography.Text>
        <Divider />
        <div className="text-center space-y-8">
          <button
            onClick={login}
            className="text-white bg-[#F9D0D0] py-5 px-24 rounded-lg"
          >
            <Typography.Text className=" font-rufina text-black text-[2rem] font-bold">
              Log In
            </Typography.Text>
          </button>
        </div>
      </div>
      <div>
        <img className="w-fit h-screen" src={img} />
      </div>
    </div>
  );
};

export default Homepage;

import img1 from "../../../assets/mpimg1.png";
import { Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  //function
  const seeMenuBtn = () => {
    navigate("/admin/menu");
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-between bg-[#000011]"
      style={{ height: "calc(100vh - 116px)" }}
    >
      {/* Nội dung chính */}
      <div className="flex-1 flex items-center justify-between px-12">
        <div className="space-y-12">
          <Typography.Text className="text-[#F8AFA6] text-4xl font-greatvibes">
            Japanese Food
          </Typography.Text>
          <br />
          <br />
          <Typography.Text className="text-[50px] text-white font-rufina">
            The JD Restaurant
          </Typography.Text>
          <Divider />
          <Typography.Text className="text-[30px] text-white">
            日本食を日本流に楽しみましょう。
          </Typography.Text>
          <div>
            <button
              onClick={seeMenuBtn}
              className="px-16 py-6 bg-[#F8AFA6] rounded-[8rem] text-[24px]"
            >
              See Menu
            </button>
          </div>
        </div>
        <img className="h-1/2 w-1/2" src={img1} alt="Japanese Food" />
      </div>

      {/* Footer */}
      <footer className="py-6 bg-[#000011] flex justify-center items-center">
        <Typography.Text className="text-[#F8AFA6] text-[40px] font-rufina">
          Let’s dive into our cuisine in a luxurious way!
        </Typography.Text>
      </footer>
    </div>
  );
};

export default AdminHome;

import img1 from "../../../assets/mpimg1.png";
import { Divider, Typography } from "antd";

import hinh1 from "../../../assets/hinh1.png";
import hinh2 from "../../../assets/hinh2.png";
import hinh3 from "../../../assets/hinh3.png";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  //function
  const readMoreBtn = () => {
    navigate("/user/about");
  };
  const seeMenuBtn = () => {
    navigate("/user/menu");
  };

  return (
    <div className="w-full h-screen bg-[#000011] space-y-6 ">
      <section className="w-full ">
        <div className="flex justify-between px-12 items-center">
          <div className="space-y-12">
            <Typography.Text className="text-[#F8AFA6] text-4xl font-greatvibes ">
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
              <div>
                <button
                  onClick={seeMenuBtn}
                  className="px-16 py-6 bg-[#F8AFA6] rounded-[8rem] text-[24px]"
                >
                  See Menu
                </button>
              </div>
            </div>
          </div>
          <img className="h-1/2 w-1/2" src={img1} alt="" />
        </div>
      </section>

      <section className="flex justify-center px-[200px] py-44 items-center ">
        <div className="w-1/2 space-y-12">
          <div>
            <Typography.Text className="text-center font-greatvibes text-[#F8AFA6] text-[30px]">
              To our valued customers
            </Typography.Text>
            <br />
            <div className="w-3/4">
              <Typography.Text className="text-center font-rufina text-[#F8AFA6] text-[50px]">
                We{" "}
              </Typography.Text>

              <Typography.Text className="text-center font-rufina text-white text-[50px]">
                Create the best foody product
              </Typography.Text>
            </div>
          </div>

          <div className="w-3/4 text-base text-justify">
            <Typography.Text className="text-white">
              Welcome to JD Restaurant, a premier dining destination that offers
              a romantic and luxurious setting for those seeking an exquisite
              Japanese culinary experience. Situated in an elegant atmosphere,
              our restaurant is perfect for an unforgettable evening, whether
              its a special celebration or a quiet dinner for two. At JD
              Restaurant, we bring you the finest selection of traditional
              Japanese dishes, artfully prepared using the freshest ingredients.
              Each meal is a harmonious blend of taste, texture, and
              presentation, designed to provide you with an unforgettable dining
              experience.
            </Typography.Text>
          </div>

          <div>
            <button
              onClick={readMoreBtn}
              className="px-16 py-6 bg-[#F8AFA6] rounded-[8rem]"
            >
              Read more
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <img src={hinh1} alt="" />
          <div className="flex justify-between space-x-4">
            <img src={hinh2} alt="" />
            <img src={hinh3} alt="" />
          </div>
        </div>
      </section>

      <footer className="footer flex justify-center items-center">
        <Typography.Text className="text-[#F8AFA6] text-[40px] font-rufina">
          Let’s dive into our cuisine in a luxurious way!
        </Typography.Text>
      </footer>
    </div>
  );
};

export default UserHome;

import { useNavigate } from "react-router-dom";
import img from "../../assets/bghp.png";
import { Divider, Form, Typography, Button, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { postLogin } from "../../service/userReducer/userThunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(postLogin(values))
      .then((res) => {
        if (res) {
          message.success("Đăng nhập thành công");
          console.log(res);
          switch (res.payload.roleID) {
            case 1:
              navigate("/add-table");
              break;
            case 2:
              navigate("/admin/home");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Sai tài khoản / mật khẩu");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full h-full bg-[#000011] flex justify-between">
      <img className="w-fit h-screen" src={img} />

      <div className="text-white text-center h-full w-1/2 mt-20">
        <section className="w-3/4">
          <Typography.Text className="text-[48px] text-white font-normal">
            JDへようこそ
          </Typography.Text>{" "}
          <br />
          <Typography.Text className="text-[#F8AFA6] text-[66px]">
            Welcome Back{" "}
          </Typography.Text>
        </section>
        <Divider />
        <Divider />
        <div className="text-center">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="text-left w-3/4 space-y-12"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="py-7 text-[24px] p-6" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="py-7 text-[24px] p-6" />
            </Form.Item>

            <Button
              htmlType="submit"
              // onClick={login}
              className="no-hover text-black  w-full font-bold text-3xl hover:text-white bg-[#F9D0D0] py-10 px-64 rounded-lg hover:bg-[#fab1b1] ease-in-out"
            >
              Log In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Divider, Form, Typography, Button, Input, message } from "antd";
import img from "../assets/bghp.png";
import AuthWrapper from "./AuthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerTable } from "../service/userReducer/userThunk";

const AddTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tableID } = useSelector((state) => state.userReducer);

  const onFinish = (values) => {
    const data = {
      tableID,
      customer: values,
    };
    dispatch(registerTable(data))
      .then((res) => {
        if (res) {
          message.success("Đăng ký bàn thành công");
          navigate("/user/home");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Đăng ký bàn thất bại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthWrapper>
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
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input className="py-4 text-[18px] px-6" placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please enter your age",
                  },
                ]}
              >
                <Input
                  className="py-4 text-[18px] px-6"
                  placeholder="Age"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input
                  className="py-4 text-[18px] px-6"
                  placeholder="Phone number"
                  type="tel"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                // onClick={login}
                className="no-hover text-black  w-full font-bold text-3xl hover:text-white bg-[#F9D0D0] py-10 px-64 rounded-lg hover:bg-[#fab1b1] ease-in-out"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default AddTable;

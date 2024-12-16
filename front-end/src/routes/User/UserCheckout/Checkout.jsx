import { Divider, Input, Modal, Typography } from "antd";
import bg from "../../../assets/checkoutbg.png";
import { userLocal } from "../../../service/userLocal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartLocal } from "../../../service/cartLocal";
import {
  updateCart,
  updateCheckout,
} from "../../../service/userReducer/userReducer";
import { chooseListItem } from "../../../service/userReducer/userThunk";

const Checkout = () => {
  const tabeID = userLocal.getTableID();
  const { cart, customerID } = useSelector((state) => state.userReducer);
  const { checkout } = useSelector((state) => state.userReducer);

  // const checkout = cartLocal.getCheckout();
  const [currentTime, setCurrentTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelOrder = () => {
    navigate("/user/menu");
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    console.log("close");
    setIsModalOpen(false);
  };

  const deleteItemInCart = (id, quantity) => {
    cartLocal.changeQuantity(id, -quantity);
    dispatch(updateCart());
  };
  const addOrdertoCart = () => {
    const items = cart.map((item) => ({
      itemID: item.itemID,
      quantity: item.quantity,
      note: item.note,
    }));

    cartLocal.addOrderToCheckout();
    cartLocal.deleteCart();
    dispatch(updateCart());

    const data = {
      items: items,
      customerID: customerID,
    };

    dispatch(chooseListItem(data));
  };
  const checkoutBill = () => {
    // /v1/orders/:customerID/checkout

    console.log("Feedback submitted:", feedback);
    alert("Thank you for your feedback!");
    setFeedback(""); // Clear the input
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(updateCheckout());

    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {}, [checkout]);

  return (
    <div
      className="w-screen h-screen text-white justify-between p-12 space-x-8 align-middle flex"
      style={{ backgroundImage: bg }}
    >
      <div className="px-8 w-2/3">
        <div className="flex justify-between align-middle">
          <Typography.Text className="text-white text-3xl">
            New order
          </Typography.Text>
          <div className="space-x-12">
            <Typography.Text className="text-white font-semibold">
              TABLE:
              <Typography.Text className="text-[#EA7C69] font-semibold">
                {tabeID}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text className="text-white font-semibold">
              TIME:{" "}
              <Typography.Text className="text-[#EA7C69] font-semibold">
                {currentTime}
              </Typography.Text>
            </Typography.Text>
          </div>
        </div>
        <Divider className="border" />
        <div className="bg-white m-8 p-8 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                  Item
                </th>
                <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                  Price
                </th>
                <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                  Qty
                </th>
                <th className="px-2 py-2 text-left text-black text-xl w-2/4">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <Typography.Text className="text-black text-xl font-semibold">
                      {item.itemInfor.itemName}
                    </Typography.Text>
                  </td>
                  <td className="p-2 ">
                    <Typography.Text className="text-black text-xl font-semibold">
                      $ {item.itemInfor.price}
                    </Typography.Text>
                  </td>
                  <td className="p-2 ">
                    <Typography.Text className="text-black text-xl font-semibold">
                      {item.quantity}
                    </Typography.Text>
                  </td>
                  <td className="p-2  space-x-4 flex justify-between">
                    <Typography.Text className="text-black text-xl font-semibold">
                      $ {item.quantity * item.itemInfor.price}
                    </Typography.Text>
                    <button
                      onClick={() =>
                        deleteItemInCart(item.itemID, item.quantity)
                      }
                      className=""
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7325 7.26576L15.8153 7.26689C16.1229 7.29232 16.3587 7.54771 16.375 7.85513L16.3671 8.02653L16.105 11.2359L15.8301 14.3679C15.7719 14.9931 15.7198 15.5205 15.6749 15.9356C15.5187 17.3824 14.5796 18.277 13.1638 18.3035C10.9578 18.3443 8.83731 18.3438 6.7781 18.2993C5.40331 18.2705 4.47805 17.3661 4.32462 15.9415L4.21858 14.8919L4.03328 12.8559L3.84347 10.6218L3.62643 7.93998C3.59946 7.5959 3.84959 7.29454 4.18512 7.26688C4.49269 7.24152 4.76525 7.45495 4.82932 7.75573L4.85426 8.00152L5.05805 10.5157L5.28057 13.1216C5.38038 14.2498 5.46695 15.1627 5.53622 15.8041C5.62365 16.6159 6.05115 17.0337 6.80343 17.0495C8.84654 17.0937 10.9512 17.0941 13.1417 17.0537C13.9398 17.0387 14.374 16.625 14.4633 15.7979L14.5689 14.7539C14.5998 14.4322 14.6328 14.077 14.6678 13.6912L14.8905 11.1282L15.1588 7.83966C15.1836 7.52426 15.4327 7.2825 15.7325 7.26576ZM3.10949 5.8244C2.77288 5.8244 2.5 5.54457 2.5 5.19938C2.5 4.88295 2.72929 4.62145 3.02679 4.58006L3.10949 4.57435H5.76476C6.0803 4.57435 6.35654 4.36615 6.45535 4.06616L6.47953 3.97352L6.68587 2.92119C6.86759 2.22422 7.45767 1.72799 8.14916 1.67202L8.27993 1.66675H11.7199C12.4229 1.66675 13.0436 2.12198 13.2826 2.8254L13.3228 2.96015L13.5203 3.97327C13.5822 4.29068 13.8354 4.52775 14.1417 4.56822L14.2351 4.57435H16.8905C17.2271 4.57435 17.5 4.85419 17.5 5.19938C17.5 5.5158 17.2707 5.77731 16.9732 5.81869L16.8905 5.8244H3.10949ZM11.7199 2.91679H8.27993C8.10892 2.91679 7.95691 3.01944 7.89377 3.14844L7.87235 3.20511L7.67483 4.21873C7.65067 4.34245 7.61566 4.46158 7.57093 4.57518L12.429 4.57534C12.4011 4.50447 12.377 4.43144 12.3569 4.35648L12.325 4.21848L12.1364 3.24408C12.0923 3.07501 11.9561 2.95123 11.7918 2.92293L11.7199 2.91679Z"
                          fill="#F9D0D0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 flex space-x-10">
          <button
            onClick={() => {
              cancelOrder();
            }}
            className="px-12 py-4 text-3xl text-[#F8AFA6] border-[#F8AFA6] border rounded-xl hover:bg-[#F8AFA6] hover:text-white hover:font-bold"
          >
            ORDER MORE
          </button>
          <button
            onClick={addOrdertoCart}
            className={`w-full py-4 text-3xl text-black rounded-lg ${
              cart.length === 0
                ? "bg-transparent border text-white cursor-not-allowed opacity-50"
                : "bg-[#ADEBFF] hover:bg-[#77c4e3]"
            }`}
            disabled={cart.length === 0}
          >
            ORDER
          </button>
        </div>
      </div>

      <div className="text-white border-l-2 px-8 w-[40%] flex flex-col justify-between">
        <div className="text-white text-3xl">
          <div>PAYABLE AMOUNT</div>
          <Divider className="border" />

          <div className="rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                    Item
                  </th>
                  <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                    Price
                  </th>
                  <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                    Qty
                  </th>
                  <th className="px-2 py-2 text-left text-black text-xl w-1/4">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {checkout.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-2 w-3/5">
                      <Typography.Text className="text-white text-xl font-semibold">
                        {item.itemInfor.itemName}
                      </Typography.Text>
                    </td>
                    <td className="py-2 px-2">
                      <Typography.Text className="text-white text-xl font-semibold">
                        $ {item.itemInfor.price}
                      </Typography.Text>
                    </td>
                    <td className="py-2 px-2">
                      <Typography.Text className="text-white text-xl font-semibold">
                        {item.quantity}
                      </Typography.Text>
                    </td>
                    <td className="py-2 px-2">
                      <Typography.Text className="text-white text-xl font-semibold">
                        $ {item.quantity * item.itemInfor.price}
                      </Typography.Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-12">
          <Divider className="border" />
          <div className="flex justify-between">
            <div className="text-2xl font-rufina uppercase font-normal">
              Total
            </div>
            <div className="text-2xl font-rufina uppercase font-normal">
              ${" "}
              {checkout.reduce((sum, item) => {
                return sum + item.quantity * item.itemInfor.price;
              }, 0)}
            </div>
          </div>

          <div className="flex justify-center space-x-20">
            <button
              onClick={showModal}
              className="px-24 py-4 text-3xl text-white border-[#F8AFA6] bg-[#F8AFA6] border rounded-xl"
            >
              Checkout
            </button>
            <Modal
              centered
              className="ant-modal-body-p-none w-[768px] bg-[#07244A]"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="text-center text-white p-8">
                <h2 className="text-2xl font-bold text-[#07244A]">
                  Thank You For Your Meal at
                </h2>
                <h1 className="text-3xl font-bold my-2 text-[#ADEBFF] font-rufina">
                  JD Restaurant
                </h1>
                <p className="text-lg text-[#D4B483]">どうもありがとう</p>
                <p className="text-lg my-4 text-[#07244A]">
                  Do you have any feedback for us?
                </p>
                <Input.TextArea
                  rows={4}
                  placeholder="Type your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mb-4"
                />
                <button
                  className="px-24 py-4 text-xl text-white border-[#F8AFA6] bg-[#F8AFA6] border rounded-xl"
                  onClick={checkoutBill}
                >
                  Submit
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { userLocal } from "../../../service/userLocal";
import { cartLocal } from "../../../service/cartLocal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../service/userReducer/userReducer";

const Order = () => {
  const menu = cartLocal.get();
  const tableID = userLocal.getTableID();
  const [notes, setNotes] = useState(menu.map(() => ""));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNoteChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };
  const checkout = () => {
    navigate("/checkout");
  };
  const deleteItemInCart = (id, quantity) => {
    cartLocal.changeQuantity(id, quantity);
    dispatch(updateCart());
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <Typography.Text className="text-[20px] text-white font-semibold">
          Table {tableID}
        </Typography.Text>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 text-left w-4/6">Item</th>
              <th className="px-2 py-2 text-left w-1/6">Qty</th>
              <th className="px-2 py-2 text-left w-1/6">Price</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-4">
                  <div className="flex space-x-3">
                    <div>
                      <Typography.Text className="text-white">
                        {item.itemInfor.itemName}{" "}
                      </Typography.Text>{" "}
                      -
                      <Typography.Text className="text-[#ABBBC2]">
                        {item.itemInfor.preparation_time} min{" "}
                      </Typography.Text>
                    </div>
                  </div>
                  <div className="pt-2 w-full">
                    <input
                      className="p-2 rounded-md text-[#ABBBC2] bg-[#07244A] w-full"
                      type="text"
                      value={notes[index] || "Enter your note"}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                    />
                  </div>
                </td>
                <td className="p-2">
                  <Typography.Text className="text-white p-4 w-12 h-full bg-[#07244A] rounded-xl">
                    {item.quantity}
                  </Typography.Text>
                </td>
                <td className="py-4 space-y-4">
                  <div>
                    <Typography.Text className="text-white">
                      $ {item.itemInfor.price}
                    </Typography.Text>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        deleteItemInCart(item.itemID, -item.quantity)
                      }
                      className="border p-3 rounded-2xl border-[#F9D0D0]"
                    >
                      <svg
                        width="20"
                        height="20"
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={checkout}
          className="w-full bg-[#ADEBFF] text-[#003459] rounded-lg py-3"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Order;

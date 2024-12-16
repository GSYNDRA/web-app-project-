import PropTypes from "prop-types";
import { Typography } from "antd";
import { cartLocal } from "../../../service/cartLocal";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../service/userReducer/userReducer";

const FoodList = ({ list }) => {
  const dispatch = useDispatch();

  const addToCart = (item) => {
    let addItem = {
      itemID: item.itemID,
      quantity: 1,
      note: "",
      itemInfor: {
        itemName: item.itemName,
        preparation_time: item.preparation_time,
        price: item.price,
      },
    };
    cartLocal.addToCart(addItem);

    dispatch(updateCart());
  };

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <div>
      <h1 className="font-rufina text-[40px] mb-8 text-[#003459]">
        {list[0]?.type_of_food}
      </h1>
      <div className="space-y-8">
        {list.map((item) => (
          <div className="flex justify-between space-x-4" key={item.itemID}>
            <div>
              <Typography.Text className="text-[#003459] text-[24px] font-rufina">
                {item.itemName}
              </Typography.Text>
              <br />
              <Typography.Text className="text-[16px] text-[#003459]">
                {item.descriptions}
              </Typography.Text>
              <br />
              <Typography.Text className="text-base text-[#72889F]">
                {item.preparation_time} min
              </Typography.Text>
            </div>

            <div className="flex flex-col justify-start space-y-4">
              <Typography.Text className="text-2xl text-[#F8AFA6] font-bold text-center">
                {item.price}$
              </Typography.Text>
              <div>
                <button
                  onClick={() => addToCart(item)}
                  className="px-8 py-4 bg-[#F8AFA6] text-white rounded-xl"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FoodList.propTypes = [
  {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        itemID: PropTypes.string.isRequired,
        itemName: PropTypes.string.isRequired,
        descriptions: PropTypes.string,
        preparation_time: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        type_of_food: PropTypes.string.isRequired,
      })
    ).isRequired,
  },
];

export default FoodList;

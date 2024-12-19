import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOnGoingTable,
  updateOrderStatus,
} from "../../../service/adminReducer/adminThunk";
import { userLocal } from "../../../service/userLocal";
import { Switch } from "antd";

const AdminFoodTrack = () => {
  const [tableList, setTableList] = useState([]);
  const { onGoingTable } = useSelector((state) => state.adminReducer);
  const adminId = userLocal.getUserId();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnGoingTable());
  }, [dispatch]);

  useEffect(() => {
    setTableList(onGoingTable);
  }, [onGoingTable]);

  const handleToggleStatus = async (tableID, chooseID, newStatus) => {
    const updatedTableList = tableList.map((table) => {
      if (table.tableID === tableID) {
        return {
          ...table,
          chooseItems: table.chooseItems.map((item) => {
            if (item.chooseID === chooseID) {
              return { ...item, status: newStatus };
            }
            return item;
          }),
        };
      }
      return table;
    });

    const updatedItems = updatedTableList
      .flatMap((table) => table.chooseItems || [])
      .filter((item) => item.chooseID === chooseID)
      .map((item) => ({
        chooseID: item.chooseID,
        status: item.status,
      }));

    if (updatedItems.length > 0) {
      await dispatch(updateOrderStatus({ items: updatedItems, adminId }));
      dispatch(getOnGoingTable());
    }
  };

  return (
    <div className="p-12 bg-white" style={{ height: "calc(100vh - 116px)" }}>
      <table className="w-full border-collapse border-none rounded-2xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Table ID</th>
            <th className="p-2">Customer ID</th>
            <th className="p-2">Order List</th>
          </tr>
        </thead>
        <tbody>
          {tableList?.map((table) => (
            <tr key={table.tableID} className="border-b">
              <td className="border p-2 text-center">{table.tableID}</td>
              <td className="border p-2 text-center">{table.customerID}</td>
              <td className="border-none p-2">
                {/* Nested table for the order list */}
                {table.chooseItems?.length > 0 ? (
                  <table className="w-full border-none">
                    <thead>
                      <tr className="">
                        <th className=" p-2">Item ID</th>
                        <th className=" p-2">Choose ID</th>
                        <th className=" p-2">Quantity</th>
                        <th className=" p-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.chooseItems.map((item) => (
                        <tr key={item.chooseID} className="border-b-2">
                          <td className=" p-2 text-center">{item.itemName}</td>
                          <td className=" p-2 text-center">{item.chooseID}</td>
                          <td className=" p-2 text-center">{item.quantity}</td>
                          <td className=" p-2 text-center">${item.price}</td>
                          <td className="p-2 text-center">
                            <Switch
                              checked={item.status === "served"}
                              onChange={(checked) =>
                                handleToggleStatus(
                                  table.tableID,
                                  item.chooseID,
                                  checked ? "served" : "order"
                                )
                              }
                              // checkedChildren="Served"
                              // unCheckedChildren="Order"
                              style={{
                                width: "50px",
                                height: "24px",
                                background:
                                  item.status === "served"
                                    ? "#52c41a"
                                    : "#d9d9d9",
                                borderRadius: "50px",
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFoodTrack;

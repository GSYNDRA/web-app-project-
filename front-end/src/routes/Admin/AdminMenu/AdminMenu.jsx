import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuThunk } from "../../../service/userReducer/userThunk";
import { Tabs, Typography, Input, Table, Modal, Select } from "antd";
import { putEditMenuItem } from "../../../service/adminReducer/adminThunk";

const AdminMenu = () => {
  const [activeTab, setActiveTab] = useState("Appetizers");
  const { menu } = useSelector((state) => state.userReducer);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuThunk());
  }, [dispatch]);

  useEffect(() => {
    if (menu && activeTab) {
      const selectedMenu = menu.find((item) => item.type_of_food === activeTab);
      setList(selectedMenu ? selectedMenu.items : []);
    }
  }, [menu, activeTab]);

  const tabList = [
    { key: "Appetizers", tab: "Appetizers" },
    { key: "Main Dishes", tab: "Main Dishes" },
    { key: "Light Meals", tab: "Light Meals" },
    { key: "Drinks", tab: "Drinks" },
    { key: "Desserts", tab: "Desserts" },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "itemID",
      width: 70,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 80,
    },
    {
      title: "Preparation",
      dataIndex: "preparation_time",
      width: 130,
    },
    {
      title: "Descriptions",
      dataIndex: "descriptions",
      ellipsis: true,
    },
    {
      title: "Actions",
      render: (item) => (
        <button
          type="link"
          className="border py-2 px-4 rounded-lg"
          onClick={() => handleEdit(item)}
        >
          Edit
        </button>
      ),
      width: 100,
    },
  ];

  const handleEdit = (item) => {
    setSelectedItem({ ...item });
    setIsModalVisible(true);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Item: ", selectedItem);
    setIsModalVisible(false);

    dispatch(putEditMenuItem(selectedItem))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-white p-12">
      <div className="text-center text-[#F8AFA6] text-6xl font-rufina font-bold">
        Menu
      </div>
      <div className="flex justify-between pt-16 space-x-4">
        <div className="w-2/3">
          <Tabs
            tabPosition="top"
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            centered
            className="bg-white px-8 py-4 rounded-xl"
          >
            {tabList.map((tab) => (
              <Tabs.TabPane
                key={tab.key}
                tab={
                  <span className="text-black text-xl font-rufina font-semibold">
                    {tab.tab}
                  </span>
                }
              >
                <div className="flex justify-between">
                  <Typography.Text className="text-2xl text-black font-serif font-semibold">
                    Choose Dish
                  </Typography.Text>
                </div>

                <Table dataSource={list} columns={columns} rowKey="itemID" />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        <div className="w-1/3 bg-white rounded-lg p-6 text-center">
          <Typography.Text
            level={3}
            className="text-center text-[#F8AFA6] font-semibold font-rufina text-3xl"
          >
            Add Menu Item
          </Typography.Text>
          <div className="flex justify-center mb-6"></div>
          <Input
            placeholder="Enter food name"
            name="itemName"
            className="mb-4 p-5"
          />
          <div className="flex space-x-4">
            <Input
              placeholder="Enter food price"
              name="price"
              className="mb-4 p-5"
            />
            <Input
              placeholder="Enter served time"
              name="preparation_time"
              className="mb-4 p-5"
            />
          </div>
          <Select placeholder="Choose food type" className="mb-4 w-full">
            {tabList.map((tab) => (
              <Select.Option key={tab.key} value={tab.key}>
                {tab.tab}
              </Select.Option>
            ))}
          </Select>
          <Input.TextArea
            placeholder="Enter food description"
            name="description"
            className="mb-4 p-5"
          />

          <div className="flex justify-between">
            <button className="px-6 py-2 text-[#EA7C69] bg-white border-[#EA7C69] border rounded-lg font-semibold">
              Discard Changes
            </button>
            <button className="px-6 py-2 bg-[#EA7C69] text-white rounded-lg font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Modal for viewing/editing */}
      <Modal
        title="View / Edit Item"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        {selectedItem && (
          <>
            <Input
              name="itemName"
              value={selectedItem.itemName}
              addonBefore="Item Name"
              onChange={handleModalInputChange}
              className="mb-2"
            />
            <Input
              name="price"
              value={selectedItem.price}
              addonBefore="Price ($)"
              onChange={handleModalInputChange}
              className="mb-2"
            />
            <Input
              name="preparation_time"
              value={selectedItem.preparation_time}
              addonBefore="Preparation Time (mins)"
              onChange={handleModalInputChange}
              className="mb-2"
            />
            <Input.TextArea
              name="descriptions"
              value={selectedItem.descriptions}
              addonBefore="Descriptions"
              onChange={handleModalInputChange}
              rows={4}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminMenu;

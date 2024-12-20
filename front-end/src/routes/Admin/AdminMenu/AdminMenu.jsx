import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuThunk } from "../../../service/userReducer/userThunk";
import { Tabs, Typography, Input, Table, Modal, Select } from "antd";
import {
  postNewItem,
  putEditMenuItem,
} from "../../../service/adminReducer/adminThunk";
// import { putEditMenuItem } from "../../../service/adminReducer/adminThunk";

const AdminMenu = () => {
  const [activeTab, setActiveTab] = useState("Appetizers");
  const { menu } = useSelector((state) => state.userReducer);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for "Add Menu Item" form
  const [formValues, setFormValues] = useState({
    itemName: "",
    type_of_food: "",
    price: "",
    descriptions: "",
    preparation_time: "",
  });

  // State for "Edit Menu Item" modal form
  const [editFormValues, setEditFormValues] = useState(null);

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

  // Add Menu Item form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormValues((prev) => ({ ...prev, type_of_food: value }));
  };

  const handleDiscardChanges = () => {
    setFormValues({
      itemName: "",
      type_of_food: "",
      price: "",
      descriptions: "",
      preparation_time: "",
    });
  };

  const handleSaveChanges = () => {
    const newItem = {
      itemName: formValues.itemName,
      type_of_food: formValues.type_of_food,
      price: parseFloat(formValues.price),
      descriptions: formValues.descriptions,
      preparation_time: parseInt(formValues.preparation_time, 10),
    };

    dispatch(postNewItem(newItem));
  };

  // Edit Menu Item modal handlers
  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditFormValues({ ...item });
    setIsModalVisible(true);
  };

  const handleEditModalChange = (e) => {
    const { name, value } = e.target;
    setEditFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditModalSave = () => {
    console.log("Updated Item: ", {
      ...editFormValues,
      price: parseFloat(editFormValues.price),
      preparation_time: parseInt(editFormValues.preparation_time, 10),
    });
    setIsModalVisible(false);

    dispatch(
      putEditMenuItem({
        ...editFormValues,
        price: parseFloat(editFormValues.price),
        preparation_time: parseInt(editFormValues.preparation_time, 10),
      })
    );
  };

  const handleEditModalDiscard = () => {
    setEditFormValues(selectedItem);
    setIsModalVisible(false);
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
          <Input
            placeholder="Enter food name"
            name="itemName"
            value={formValues.itemName}
            onChange={handleInputChange}
            className="mb-4 p-5"
          />
          <div className="flex space-x-4">
            <Input
              placeholder="Enter food price"
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
              className="mb-4 p-5"
            />
            <Input
              placeholder="Enter served time"
              name="preparation_time"
              value={formValues.preparation_time}
              onChange={handleInputChange}
              className="mb-4 p-5"
            />
          </div>
          <Select
            placeholder="Choose food type"
            value={formValues.type_of_food}
            onChange={handleSelectChange}
            className="mb-4 w-full"
          >
            {tabList.map((tab) => (
              <Select.Option key={tab.key} value={tab.key}>
                {tab.tab}
              </Select.Option>
            ))}
          </Select>
          <Input.TextArea
            placeholder="Enter food description"
            name="descriptions"
            value={formValues.descriptions}
            onChange={handleInputChange}
            className="mb-4 p-5"
          />
          <div className="flex justify-between">
            <button
              className="px-6 py-2 text-[#EA7C69] bg-white border-[#EA7C69] border rounded-lg font-semibold"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </button>
            <button
              className="px-6 py-2 bg-[#EA7C69] text-white rounded-lg font-semibold"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      <Modal
        title="Edit Menu Item"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editFormValues && (
          <>
            <Input
              name="itemName"
              value={editFormValues.itemName}
              addonBefore="Item Name"
              onChange={handleEditModalChange}
              className="mb-2"
            />
            <Input
              name="price"
              value={editFormValues.price}
              addonBefore="Price ($)"
              onChange={handleEditModalChange}
              className="mb-2"
            />
            <Input
              name="preparation_time"
              value={editFormValues.preparation_time}
              addonBefore="Preparation Time (mins)"
              onChange={handleEditModalChange}
              className="mb-2"
            />
            <Input.TextArea
              name="descriptions"
              value={editFormValues.descriptions}
              addonBefore="Descriptions"
              onChange={handleEditModalChange}
              rows={4}
              className="mb-2"
            />
            <div className="flex justify-between">
              <button
                className="px-6 py-2 text-[#EA7C69] bg-white border-[#EA7C69] border rounded-lg font-semibold"
                onClick={handleEditModalDiscard}
              >
                Discard Changes
              </button>
              <button
                className="px-6 py-2 bg-[#EA7C69] text-white rounded-lg font-semibold"
                onClick={handleEditModalSave}
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminMenu;

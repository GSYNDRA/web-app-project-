import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMenuThunk } from "../../../service/userReducer/userThunk";
import { Tabs, Typography, Button } from "antd";

const AdminMenu = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuThunk());
  }, []);

  const tabList = [
    { key: "tab1", tab: "Appetizer" },
    { key: "tab2", tab: "Main Dish" },
    { key: "tab3", tab: "Light Meal" },
    { key: "tab4", tab: "Drink" },
    { key: "tab5", tab: "Dessert" },
  ];

  return (
    <div className="text-white p-12">
      <div className="text-center text-[#F8AFA6] text-6xl font-rufina font-bold">
        Menu
      </div>
      <div className="flex justify-between pt-16">
        <div className="w-3/5">
          <Tabs
            tabPosition="top"
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            centered
            className="bg-black"
          >
            {tabList.map((tab) => (
              <Tabs.TabPane
                key={tab.key}
                tab={<span className="text-white text-xl">{tab.tab}</span>}
              >
                <div className="flex justify-between">
                  <Typography.Text className="text-xl text-white">
                    Choose Dish
                  </Typography.Text>
                  <Button>Edit</Button>
                </div>

                <div className="text-white">check</div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        <div>{/* <Form></Form> */}</div>
      </div>
    </div>
  );
};

export default AdminMenu;

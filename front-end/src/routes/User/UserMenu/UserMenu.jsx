import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMenuThunk } from "../../../service/userReducer/userThunk";

import FoodList from "./FoodList";

import menubg1 from "../../../assets/menu1.png";
import menubg2 from "../../../assets/menu2.png";
import menubg3 from "../../../assets/menu3.png";
import menubg4 from "../../../assets/menu4.png";
import menubg5 from "../../../assets/menu5.png";
import footer2 from "../../../assets/footer2.png";

import menuDividered from "../../../assets/menuDiveredBg.png";
import Order from "./Order";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.userReducer);

  const [appetizers, setAppetizers] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [lightMeals, setLightMeals] = useState([]);
  const [mainDishes, setMainDishes] = useState([]);

  useEffect(() => {
    dispatch(getMenuThunk());
  }, [dispatch]);

  useEffect(() => {
    if (menu && menu.length > 0) {
      const appetizersData = menu.find(
        (item) => item.type_of_food === "Appetizers"
      );
      const dessertsData = menu.find(
        (item) => item.type_of_food === "Desserts"
      );
      const drinksData = menu.find((item) => item.type_of_food === "Drinks");
      const lightMealsData = menu.find(
        (item) => item.type_of_food === "Light Meals"
      );
      const mainDishesData = menu.find(
        (item) => item.type_of_food === "Main Dishes"
      );

      // Set the states accordingly
      setAppetizers(appetizersData ? appetizersData.items : []);
      setDesserts(dessertsData ? dessertsData.items : []);
      setDrinks(drinksData ? drinksData.items : []);
      setLightMeals(lightMealsData ? lightMealsData.items : []);
      setMainDishes(mainDishesData ? mainDishesData.items : []);
    }
  }, [menu]);

  return (
    <div className="w-full h-full bg-white">
      <div className=" space-y-24 p-12">
        {/* Appetizers Section */}
        <section className="flex justify-between space-x-4">
          <div className="max-w-[70%] space-y-24">
            {/* Appetizers Dishes */}
            <section className="flex space-x-10 ">
              <img src={menubg1} alt="Appetizers" />
              <FoodList list={appetizers} />
            </section>
            {/* Main Dishes */}
            <section className="flex justify-between space-x-4 w-full">
              <FoodList list={mainDishes} />
              <img src={menubg2} alt="Appetizers" />
            </section>
          </div>
          <div className="w-[30%] h-full bg-black rounded-xl">
            <Order />
          </div>
        </section>
      </div>

      {/* Divider */}
      <div>
        <img
          className="w-full opacity-40 relative"
          src={menuDividered}
          alt=""
        />
      </div>

      <div className=" space-y-24 p-12">
        {/* Light Meal */}
        <section className="flex justify-between space-x-4">
          <div className="flex space-x-10 max-w-[70%]">
            <FoodList list={lightMeals} />
            <img src={menubg3} alt="Appetizers" />
          </div>
        </section>

        <section className="flex justify-between space-x-4">
          <div className="flex space-x-10 max-w-[70%]">
            <img src={menubg4} alt="Appetizers" />
            <FoodList list={drinks} />
          </div>
        </section>

        <section className="flex justify-between space-x-4">
          <div className="flex space-x-10 max-w-[70%]">
            <img src={menubg5} alt="Appetizers" />
            <FoodList list={desserts} />
          </div>
        </section>
      </div>

      <img src={footer2} alt="" />
    </div>
  );
};

export default UserMenu;

import { message } from "antd";

export const cartLocal = {
  set: () => {
    localStorage.setItem("items", JSON.stringify([]));
  },

  get: () => {
    let json = localStorage.getItem("items");
    if (json) {
      return JSON.parse(json);
    } else {
      return [];
    }
  },

  deleteCart: () => {
    localStorage.removeItem("items");
  },
  deleteCheckout: () => {
    localStorage.removeItem("checkout");
  },

  // Add an item to the cart in localStorage
  addToCart: (data) => {
    let json = localStorage.getItem("items");
    let cart = json ? JSON.parse(json) : [];

    const existingItemIndex = cart.findIndex(
      (item) => item.itemID === data.itemID
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += data.quantity;
    } else {
      cart.push(data);
    }

    localStorage.setItem("items", JSON.stringify(cart));
    message.success("Add to cart");
  },

  itemQanInCart: (id) => {
    let json = localStorage.getItem("cart");
    let cart = json ? JSON.parse(json) : [];

    const existingItem = cart.find((item) => item.itemID === id);

    if (existingItem) {
      return existingItem.quantity;
    } else {
      return -1;
    }
  },

  changeQuantity: (id, change) => {
    let json = localStorage.getItem("items");
    let cart = json ? JSON.parse(json) : [];

    const itemIndex = cart.findIndex((item) => item.itemID === id);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity += change;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    }

    localStorage.setItem("items", JSON.stringify(cart));
    return cart;
  },

  //Checkout menu
  getCheckout: () => {
    let json = localStorage.getItem("checkout");
    if (json) {
      return JSON.parse(json);
    } else {
      return [];
    }
  },
  addOrderToCheckout: () => {
    let cartJson = localStorage.getItem("items");
    let cart = cartJson ? JSON.parse(cartJson) : [];
    let checkoutJson = localStorage.getItem("checkout");
    let checkout = checkoutJson ? JSON.parse(checkoutJson) : [];

    cart.forEach((item) => {
      const existingItemIndex = checkout.findIndex(
        (checkoutItem) => checkoutItem.itemID === item.itemID
      );

      if (existingItemIndex !== -1) {
        checkout[existingItemIndex].quantity += item.quantity;
      } else {
        checkout.push(item);
      }
    });
    localStorage.removeItem("items");
    localStorage.setItem("checkout", JSON.stringify(checkout));
    message.success("Order added to checkout");
  },

  //Logout
  deleteAll: () => {
    localStorage.removeItem("checkout");
    localStorage.removeItem("items");
  },
};

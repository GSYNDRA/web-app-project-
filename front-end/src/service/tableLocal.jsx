export const tableLocal = {
  setOnGoingTable: (data) => {
    localStorage.removeItem("onGoingTable");

    let json = localStorage.getItem("onGoingTable");
    let cart = json ? JSON.parse(json) : [];

    data.forEach((newItem) => {
      cart.push(newItem);
    });

    localStorage.setItem("onGoingTable", JSON.stringify(cart));
  },
};

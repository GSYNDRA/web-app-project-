import { http } from "../urlCofig";

export const userService = {
  //Login in => get userID and tableID
  postLogin: (data) => {
    let url = "/auth/v1/login";
    return http.post(url, data);
  },

  //   get all dishes in menu
  showMenu: () => {
    let url = `/table/v1/menu-item`;
    return http.get(url);
  },

  //Register new table
  registerTable: (tableID, customer) => {
    let url = `/table/v1/${tableID}/customers`;
    return http.post(url, customer);
  },

  // Post order
  postchooseListItem: (items, customerID) => {
    let url = `/table/v1/menu/${customerID}/choose`;
    return http.post(url, items);
  },
};

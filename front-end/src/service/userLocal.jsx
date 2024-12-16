export const userLocal = {
  //input item to local storage
  setInfor: (inforUser) => {
    let json = JSON.stringify(inforUser);
    localStorage.setItem("inforUser", json);
  },
  setUserID: (userID) => {
    let json = JSON.stringify(userID);
    localStorage.setItem("userID", json);
  },
  setTableID: (tableID) => {
    let json = JSON.stringify(tableID);
    localStorage.setItem("tableID", json);
  },
  setCustomerID: (customerID) => {
    let json = JSON.stringify(customerID);
    localStorage.setItem("customerID", json);
  },

  setRoleName: (data) => {
    let inforUser;
    if (data == 2) inforUser = "admin";
    else inforUser = "customer";
    let json = JSON.stringify(inforUser);
    localStorage.setItem("userRole", json);
  },

  //get information from local storage
  getInfor: () => {
    let json = localStorage.getItem("inforUser");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  getRoleName: () => {
    let json = localStorage.getItem("userRole");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  getUserId: () => {
    let json = localStorage.getItem("userID");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  getTableID: () => {
    let json = localStorage.getItem("tableID");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  getCustomerID: () => {
    let json = localStorage.getItem("customerID");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },

  //delete item in local storage
  delete: () => {
    // localStorage.removeItem('inforUser')
    localStorage.removeItem("userRole");
    localStorage.removeItem("userID");
    localStorage.removeItem("tableID");
  },
};

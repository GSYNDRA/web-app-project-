import { http } from "../urlCofig";

export const adminService = {
  //Get on Going table => See the list of items
  getOnGoingTable: () => {
    let url = "/admin/v1/tables";
    return http.get(url);
  },

  updateOrderStatus: (data) => {
    let url = `/admin/v1/${data.adminId}/tables/status`;
    return http.put(url, { items: data.items });
  },

  updateMenuItem: (data) => {
    let url = `/admin/v1/edit_menu`;
    return http.put(url, data);
  },
  postNewItem: (data) => {
    let url = `/admin/v1/new_dish`;
    return http.post(url, data);
  },
};

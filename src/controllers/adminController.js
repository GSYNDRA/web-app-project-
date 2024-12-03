import { responseData } from "../config/response.js";
import * as service from "../services/adminServices.js";


export default class AdminController {
  static async signup(req, res) {
    const { role_id, name, phone_number, email, password, other, relationship} = req.body;
    const { error, data, status } = await service.signupService(
      role_id,
      name,
      phone_number,
      email,
      password,
      other,
      relationship
    );

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "success", data, status);
  }

  static async editStatusOfMenuItems(req, res) {
    const {adminID} = req.params;
    const { items } = req.body;
    const { error, data, status } = await service.editStatusOfMenuItemsService(adminID, items);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "success", data, status);
  }

  static async getItemsOfTables(req, res) {
    const { error, data, status } = await service.getItemsOfTablesService();

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "success", data, status);
  }

  static async logout(req, res) {
    const { token } = req.headers;
    const { error, message, status } = await service.logoutService(token);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, message, "", status);
  }

  static async refreshToken(req, res) {
    const { token } = req.headers;
    const { error, data, status } = await service.refreshTokenService(token);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "", data, status);
  }
  
  static async viewDetailTransaction(req, res) {
    const { transactionID } = req.body;
    const { error, data, status } = await service.viewDetailTransactionService(transactionID);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "", data, status);
  }
  
  
  static async getDailyRevenue(req, res) {
    const { date } = req.body;
    const { error, data, status } = await service.getDailyRevenueService(date);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }
  static async listTables(req, res) {
    const { quantity  } = req.body;
    const { error, data, status } = await service.listTablesService(quantity);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }
  
}

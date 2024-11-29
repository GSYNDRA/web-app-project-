import { responseData } from "../config/response.js";
import * as service from "../services/tableServices.js";

export default class TableController {
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

  static async login(req, res) {
    const { email, password } = req.body;
    const { error, data, status } = await service.loginService(email, password);

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "Login successfully", data, status);
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



  static async showMenuItems(req, res) {
    const { error, data, status } = await service.showMenuItemsService(
    );

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }


  static async registerCustomer(req, res) {
    const { tableID } = req.params; // Extract tableID from route parameter
    const { customerName, phone, age } = req.body; // Extract customer details from request body
    const { error, data, status } = await service.registerCustomerService(
      customerName,
      phone,
      age,
      tableID
    );


    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }
  static async getChosenItems(req, res) {
    const { customerID } = req.params; // Extract customerID from route parameter
    // const { customerName, phone, age } = req.body; // Extract customer details from request body
    const { error, data, status } = await service.getChosenItemsService(
      customerID
    );


    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }
  static async chooseMenuItems(req, res) {
    const { customerID } = req.params; // Extract tableID from route parameter
    const { items  } = req.body; // Extract customer details from request body
    const { error, data, status } = await service.chooseMenuItemsService(
      customerID,
      items
    );

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }

  static async editChosenItems(req, res) {
    const { customerID } = req.params; // Extract tableID from route parameter
    const { items  } = req.body; // Extract customer details from request body
    const { error, data, status } = await service.editChosenItemsService(
      customerID,
      items
    );

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }

  
  static async checkoutBill(req, res) {
    const { customerID } = req.params; // Extract tableID from route parameter
    const { payment_method, feedback } = req.body;

    const { error, data, status } = await service.checkoutBillService(
      customerID,
      payment_method, 
      feedback
    );

    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "successful", data, status);
  }
  
}

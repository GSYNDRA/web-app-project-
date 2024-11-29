// import bcrypt from "bcrypt";
// import initModels from "../models/init-models.js";
// import sequelize from "../config/database.js";
// import {
//   checkRefToken,
//   checkToken,
//   createRefToken,
//   createToken,
//   decodeToken,
// } from "../config/jwt.js";
// import Joi from "joi";
// import { Sequelize } from "sequelize";
// let Op = Sequelize.Op;


// let model = initModels(sequelize);


  
import bcrypt from "bcrypt";
import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from "../config/jwt.js";
import Joi from "joi";

let model = initModels(sequelize);

export const signupService = async (
  role_id,
  email,
  password,
  name,
  quantity
) => {
  try {
    let check_user = await model.Account.findOne({
      where: { email },
    });

    if (check_user) {
      return { error: "Email exists, use another email", status: 400 };
    }

    let hashedPassword = bcrypt.hashSync(password, 10);
    let newUser = await model.Account.create({
      roleID: role_id,
      email,
      password: hashedPassword,
    });

    let roleDetails = null;

    switch (role_id) {
      case 1: // Table 
        const table = await model.TableEntity.create({
          userID: newUser.userID,
          tableName: name,
          quantity: quantity,
          status: 0, 
        });
        roleDetails = {
          role: "Table",
          tableName: table.tableName,
          quantity: table.quantity
        };
        break;
      case 2: // Admin
        const admin = await model.Admin.create({
          userID: newUser.userID,
          adminName: name
        });
        roleDetails = {
          role: "Admin",
          adminName: admin.adminName
        };
        break;
    }

    return {
      data: {
        userID: newUser.userID,
        roleID: newUser.roleID,
        email: newUser.email,
        role_details: roleDetails
      },
      status: 200
    };
  } catch (error) {
    console.error(error);
    return { error: "Error creating user", status: 500 };
  }
};



export const loginService = async (email, password) => {

  // const schema = Joi.object({
  //   email: Joi.string().email().required().messages({
  //     "string.email": "Invalid email format",
  //     "any.required": "Email is required",
  //   }),

  //   password: Joi.string().min(8).required().messages({
  //     "string.min": "Password must be at least 8 characters long",
  //     "any.required": "Password is required",
  //   }),
  // });
  // Validate the input
  // const { error } = schema.validate({ email, password });

  // if (error) {
  //   return { error: error.details[0].message, status: 400 };
  // }
  try {
    let check_user = await model.Account.findOne({
      where: { email },
    });

    if (!check_user) {
      return { error: "Incorrect email or password", status: 400 };
    }


    if (check_user && bcrypt.compareSync(password, check_user.password)) {
      if(check_user.roleID == 1){
        let table = await model.TableEntity.findOne({
          where: { userID: check_user.userID},
        });
        let token = { 
          userID: check_user.userID,
          tableID: table.tableID
         };
         return { data: token, status: 200 };
      }
      else{
        let token = { userID: check_user.userID };
        return { data: token, status: 200 };
      }
 
    } else {
      return { error: "Incorrect email or password", status: 400 };
    }
  } catch (error) {
    console.error(error);
    return { error: "Error logging in", status: 500 };
  }
};


export const editStatusOfMenuItemsService = async (
    adminID,items
  ) => {
    try {
        const admin = await model.Admin.findOne({
            where: {
                AdminID: adminID
            }})
            if (!admin) {
                return {
                  error: `Admin ID ${admin.AdminID} doesn't exist`,
                  status: 404,
                };
              }  
      const updatedItems = [];
  
        for (const item of items) {
          const { chooseID, status } = item;
          // Find the chosen item
          const chosenItem = await model.Choose.findOne({
            where: {
                chooseID
            },
          });
  
          if (!chosenItem) {
            return {
              error: `Item with ID ${chosenItem.itemID} either does not belong to customer ${customerID} or is not in 'order' status`,
              status: 404,
            };
          }
  
          // Update status of the chosen item
          chosenItem.status = status ; // Update status if provided
   
          await chosenItem.save();
  
          updatedItems.push(chosenItem);
        }
      
        return { data: updatedItems, status: 200 };
  
    } catch (err) {
        console.error(err);
        return { error: "Error editing menu items ", status: 500 };
    }
  };


  export const getItemsOfTablesService = async (
  ) => {
    try {
        // Step 1: Fetch all tables with status = 1 (ongoing)
    const ongoingTables = await model.TableEntity.findAll({
      where: { status: 1 }, // Status = 1 means ongoing
      include: [
        {
          model: model.Customer,
          as: 'Customers', // Assuming the association is set
          attributes: ['customerID'],
          order: [['customerID', 'DESC']], // Get the latest customerID
          limit: 1, // Fetch only the latest customer for each table
        },
      ],
    });
    console.log(ongoingTables)
    if (!ongoingTables.length) {
      return { error: 'No ongoing tables found.', status: 404 };
    }

    const results = [];

    // Step 2: Loop through each table to fetch Choose data for the latest customerID
    for (const table of ongoingTables) {
      const latestCustomer = table.Customers[0];
      if (latestCustomer) {
        const chooseData = await model.Choose.findAll({
          where: { customerID: latestCustomer.customerID, deleted: 0 },
          include: [
            {
              model: model.Menu_Item,
              as: 'item', // Assuming a proper association exists
              attributes: ['itemName', 'price', 'preparation_time'],
            },
          ],
        });

        // Format data for each table
        results.push({
          tableID: table.tableID,
          tableName: table.tableName,
          customerID: latestCustomer.customerID,
          chooseItems: chooseData.map((item) => ({
            chooseID: item.chooseID,
            itemID: item.itemID,
            itemName: item.menuItem?.itemName || null,
            quantity: item.quantity,
            note: item.note || null,
            price: item.price,
            status: item.status,
            preparation_time: item.menuItem?.preparation_time || null,
          })),
        });
      }
    }

    return { data: results, status: 200 };  
    } catch (err) {
        console.error(err);
        return { error: "Error editing menu items ", status: 500 };
    }
  };

  
  export const viewDetailTransactionService = async (
    transactionID
  ) => {
    try {
          // Fetch all orders associated with the transactionID
    const orders = await model.Order.findAll({
      where: { transactionID },
      include: [
        {
          model: model.Choose,
          as: 'choose', // Assuming proper association between Order and Choose
          include: [
            {
              model: model.Menu_Item,
              as: 'item', // Assuming association with Menu_Item
              attributes: ['itemID', 'itemName', 'preparation_time', 'price'], // Fetch item details
            },
          ],
        },
      ],
    });

    const items = {};

    // Iterate through orders
    orders.forEach((order) => {
      const chooseEntries = Array.isArray(order.choose) ? order.choose : [order.choose];
      chooseEntries.forEach((choice) => {
        if (!choice) return; // Skip if choose is null

        const { itemID, quantity, price, item } = choice;

        // Group data by itemID
        if (!items[itemID]) {
          items[itemID] = {
            itemID,
            itemName: item.itemName,
            preparation_time: item.preparation_time,
            quantity: 0,
            totalPrice: 0,
          };
        }

        // Aggregate data
        items[itemID].quantity += quantity;
        items[itemID].totalPrice += price;
      });
    });

    // Format the aggregated data into an array
    const formattedItems = Object.values(items);

    // Fetch transaction metadata
    const transaction = await model.Transaction.findOne({
      where: { transactionID },
      attributes: ['transactionID', 'customerID', 'payment_method', 'date', 'totalPrice'],
    });

    if (!transaction) {
      return { error: 'Transaction not found', status: 404 };
    }

    // Combine transaction metadata with formatted items
    return {
      data: {
        transactionID: transaction.transactionID,
        customerID: transaction.customerID,
        payment_method: transaction.payment_method,
        date: transaction.date,
        totalPrice: transaction.totalPrice,
        items: formattedItems,
      },
      status: 200
    };
    } catch (err) {
        console.error(err);
        return { error: "Error editing menu items ", status: 500 };
    }
  };
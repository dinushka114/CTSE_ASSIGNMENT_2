const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const CustomerRepository = require("../database/repository/customer.repository");

class CustomerServise {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async RegisterCustomer(userInputs) {
    const { name, email, password } = userInputs;

    try {
      let existingCustomer = await this.repository.FindCustomer(email);

      if (!existingCustomer) {
        await this.repository.CreateCustomer(userInputs);
        return { success: true, message: "Customer created successfully." };
      } else {
        return {
          success: false,
          message: "Customer with this email already exists.",
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async LoginCustomer(userInputs) {
    const { email, password } = userInputs;

    try {
      let existingCustomer = await this.repository.FindCustomer(email);

      if (!existingCustomer) {
        return { success: false, message: "User not found with this email" };
      } else {
        let isMatch = await bcrypt.compare(password, existingCustomer.password);

        if (isMatch) {
          let token = jwt.sign(
            {
              id:existingCustomer._id,
              name: existingCustomer.name,
              email: existingCustomer.email,
            },
            process.env.APP_SECRET,
            { expiresIn: "3 days" }
          );

          let result = {
            id:existingCustomer._id,
            name: existingCustomer.name,
            email: existingCustomer.email,
            token: `Bearer ${token}`,
            expiresIn: 168,
          };

          return { success: true, message: result };

        }else{
            return { success: false, message: "Incorrect Password" };
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CustomerServise;

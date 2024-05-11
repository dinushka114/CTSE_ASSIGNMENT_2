const bcrypt = require("bcrypt");
const User = require("../models/User");

class CustomerRepository {
  async CreateCustomer({name, email, password} ) {

    try {
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password:passwordHash,
      });

      await newUser.save();

    } catch (err) {
        throw err;
    }
  }

  async FindCustomer(email){
    let user = await User.findOne({ email });
    return user;
  }

  

}

module.exports = CustomerRepository;

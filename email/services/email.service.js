var nodemailer = require("nodemailer");

class EmailService {
  async sendEmail(to) {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dinushkapiyumal678@gmail.com",
          pass: "lyxp ocsd nnnl cckg",
        },
      });

      let mailOptions = {
        from: "dinushkapiyumal678@gmail.com",
        to: to,
        subject: "Thank you for shopping with us",
        text: "That was easy!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info.response); 
        }
      });
    });
  }
}

module.exports = EmailService;

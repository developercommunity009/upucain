const nodemailer = require("nodemailer");



const contactEmail = async (options) => {
  
    const transporter = nodemailer.createTransport({


        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_ID, // generated ethereal user
          pass: process.env.MP, // generated ethereal password
        }

});

// Define The Email Option

const mailOptions = {
    from: `NFTMarkitPlace ${options.email}`,
    to:  "developercommunity009@gmail.com",
    subject: options.subject,
    text: options.message,
    html: options.html
};
// Active and send mail
await transporter.sendMail(mailOptions)
}

module.exports = contactEmail;
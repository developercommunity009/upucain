
const nodemailer = require("nodemailer");



const sendEmail = async (options) => {
    // Create A Transpoter
    // const transporter = nodemailer.createTransport({
    //     // service:"Gmail",// BUT here we are going using to MailTrap for testin purpose Sending the Mail 

    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD
    //     },
    //})
    const transporter = nodemailer.createTransport({
        
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_ID, // generated ethereal user
          pass: process.env.MP, // generated ethereal password
        }
   
    // host: 'smtp.ethereal.email',
    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //     user: 'cheyanne.heaney87@ethereal.email',
    //     pass: '4XEjr3Y7kJXvBJTBcK'

});

// Define The Email Option

const mailOptions = {
    from: "codevertix <codevertix@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
};
// Active and send mail
await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;




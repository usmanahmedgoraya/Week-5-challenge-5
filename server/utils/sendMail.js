const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require('dotenv').config()


const sendMail = async (options) => {
    // Configure nodemailer with your email service provider's SMTP details
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        // Convert the port into a an integer
        port: parseInt(process.env.SMTP_PORT || "548"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        debug: true,
        secure: true,
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    // Destructuring the Options
    const { email, subject, template, data } = options;
    // get the path to the email template
    const templatePath = path.join(__dirname, '../Mail', template)
    // Render the email template with EJS
    const html = await ejs.renderFile(templatePath, data)
    // Send the email
    const mailOptions = ({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        html
    });
    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });;
}

module.exports = sendMail;
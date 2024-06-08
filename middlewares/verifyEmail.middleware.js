const nodemailer = require("nodemailer");
const { response_400 } = require("../utils/responseCodes.utils");
require("dotenv").config();
exports.verifyEmail = async (email, req, res) => {
    try {
        const OTP = Math.floor(Math.random() * 90000) + 10000;
        const s = `The OTP for email verification is ${OTP}`;
        const auth = nodemailer.createTransport({
          service: "gmail",
          secure: true,
          port: 465,
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
          },
        });
        const receiver = {
          from: process.env.SENDER_EMAIL,
          to: [email],
          subject: "Email verification",
          text: s,
        };
        auth.sendMail(receiver, (err, emailResponse) => {
          if (err) {
            throw err;
          }
          console.log("success");
          res.end();
        });
        const enteredOTP = parseInt(req.body);
        if (enteredOTP === OTP) {
            res.redirect('/home');
        }
        else {
            res.redirect('/signup').send('Invalid OTP');
        }
    } catch (error) {
        return response_400(res, error);
    }
}

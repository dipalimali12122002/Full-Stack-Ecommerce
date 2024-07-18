const userModel = require("../../models/userModel");
const nodemailer = require('nodemailer');

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("User not registered");
      return res.status(404).json({ message: "User not registered", success: false });
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dipali12122002@gmail.com',
        pass: 'yourpassword' // make sure to replace 'yourpassword' with your actual password
      }
    });

    var mailOptions = {
      from: 'dipali12122002@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:3000/resetPassword`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email: ", error);
        return res.status(500).json({ message: "Error sending email", success: false });
      } else {
        console.log("Email sent: ", info.response);
        return res.status(200).json({ status: true, message: "Email sent", success: true });
      }
    });

  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = forgotPassword;

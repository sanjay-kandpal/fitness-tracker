// services/emailService.js
const nodemailer = require('nodemailer');

// Configure the email transport service (Gmail in this example)
const sendEmail = async (userEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password',   // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: userEmail,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Health report sent to:', userEmail);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports = {
  sendEmail,
};

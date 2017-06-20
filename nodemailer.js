var nodemailer = require('nodemailer');

module.exports = function (message) {
    let transporter = nodemailer.createTransport({
        host: process.env.smtpHost,
        port: process.env.smtpPort,
        secure: true,
        auth: {
            user: process.env.smtpUser,
            pass: process.env.smtpPass
        }
    });
    
    let mailOptions = {
        from: process.env.smtpFrom,
        to: process.env.smtpTo,
        subject: 'Benefit Overpayment',
        text: message
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('>>> Message %s sent: %s', info.messageId, info.response);
    });
};
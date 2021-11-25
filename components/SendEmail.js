const nodemailer = require('nodemailer');

function sendEmail(email, customerEmail, subject, html){

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'toffee.noreply@gmail.com',
            pass: 'Fer@27640329'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    console.log('email ', email)
    console.log('customerEmail ',customerEmail)

    var mailOptions = {
        to: email,
        from: 'Toffee <toffee.noreply@gmail.com>',
        replyTo: customerEmail,
        subject,
        html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response); 
        }
    });
}

module.exports = sendEmail;
const nodemailer = require('nodemailer');

const sendEmail = function(thisFlat) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.GMAIL_USER_EMAIL}`,
          pass: `${process.env.GMAIL_PASSWORD}`
        }
    });

    const mailOption = {
        from: "Flat Grabber <flatgrabber@gmail.com>",
        to: `${process.env.RECEIVER_EMAIL}`,
        subject: "wow, we found a new flat! 👍",
        html: `
            <h2>Flat Grabber 🤜🏠</h2>
            <b>Name:</b> ${thisFlat.name}<br>
            <b>Price:</b> ${thisFlat.price}<br>
            <b>Number of rooms:</b> ${thisFlat.rooms}<br>
            <b>Size:</b> ${thisFlat.size}<br>
            <b>Address:</b> ${thisFlat.address}</br>
            <b><a href="https://www.google.com/maps/dir/${thisFlat.address}" target="_blank">Open in gmap</a></b><br>
            <b>Direct link:</b> ${thisFlat.link}<br>
        `   
    };

    transporter.sendMail(mailOption, function(error, info){
        if (error) {
            return console.log(error);
        } 
        console.log('Email sent: ' + info.response);
    });
}

module.exports = sendEmail;
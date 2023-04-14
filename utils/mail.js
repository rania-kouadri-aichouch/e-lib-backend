const nodemailer = require('nodemailer');

//loads environment variables from a .env file
require('dotenv').config();


//imports the nodemailer library to send emails
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
  });


//function to send an email

function sendEmail(from , to ,subject , text){
     
    const message = {
        from: `${from}`,
        to: `${to}`,
        subject: `${subject}`,
        text: `${text}`
    };
  
    transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json("email sent ");
        }
    });


  }


async function sendEmailToMultipleUsers(from , to ,subject , text){

  to.forEach(user => {

      sendEmail(from , user.email , subject , text)
    
  });

}
module.exports={
    sendEmail,
    sendEmailToMultipleUsers
}  

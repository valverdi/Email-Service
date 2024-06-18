const { error } = require('@hapi/joi/lib/base');
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:'devtestingsirius2@gmail.com',
        pass: process.env.nodemailer_key
    }
});
async function SendEmail2(email,subject,text){
    const msg = {
      to: email, // mail will be send the mail  
      subject: subject,
      html: '<h1>'+text+'</h1>',
    }
try {
   await transporter.sendMail(msg)
   console.log('email sent')
}catch(error){
    console.error(error)
}
}
module.exports = SendEmail2
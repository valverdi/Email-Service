
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.sendgrid_key)
async function SendEmail(email,subject,text){
const msg = {
  to: email, // mail will be send the mail
  from: 'devtestingsirius@gmail.com', //Sender Verified
  subject: subject,
  text: text,
  html: '<p>'+text+'</p>',
}
try{
    await sgMail.send(msg)
    console.log("message sent")
}catch(error) {
    console.log(error)
  }
}


  module.exports = SendEmail
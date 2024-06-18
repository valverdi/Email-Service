
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
      console.log("mensaje enviado correctamente")

      }catch(error) 
        {
        console.error(error)
        console.log('El servicio Sengrid no esta funcionando')//traducir
        console.log('los pasaremos automaticamente a nodemailer')//traducir
        } 
        }
  

  module.exports = SendEmail;
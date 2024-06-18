/*
express to configurate the http server
body-parser capturar lo que viene del cliente
mongoose para conectar con mongo db
bcryp cifrado de contraseñas
dotenv variables de entorno
jsonwebtoken
@hapi/joi valiadaciones de mail
nodemon
cors para evitar el bloqueo de cors
*/
const router = require('express').Router();
const dotenv=require('dotenv')
dotenv.config()
const SG =require('./sengrid.js')
const nodemailer=require('./Nodemailer.js')

router.post('/enviar_mail',async (req,res) =>{
try{
    SG('tomasvalver2002@gmail.com','nasi comeme las bolas','esto anda en node.js aprende gordito')
}catch{
    try{
        nodemailer('valentinnasi@gmail.com','nasi comeme las bolas','esto anda en node.js aprende gordito')
    
    }
    catch(error)
    {
        console.log('error en ambos servicios')
    }

}
})
module.exports= router;

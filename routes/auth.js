const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const { $_modify } = require('@hapi/joi/lib/base');
const bcrypt = require('bcrypt')
const jwt2 = require('jsonwebtoken');

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
    })



 const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
 })




router.post('/register', async (req, res) => {
    //validaciones de usuario
    const { error } = schemaRegister.validate(req.body)//validar campos y email
    
    if (error) {
        return res.status(400).json({error: error.details[0].message} )
    }
    const uniqueEmail = await User.findOne({email: req.body.email}) //validar mail unico
    if(uniqueEmail) return res.status(400).json({error:true,mensaje:'Email already in use'} )
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    const token = jwt2.sign({
        name: user.name,
        id: user._id,
        emailssent: user.emailsSent
        }, process.env.ACCES_TOKEN_SECRET)


     res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})


module.exports = router;
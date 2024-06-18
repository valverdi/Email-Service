const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

const uri = 'mongodb+srv://api-directo:zlXDt3nB0YyxiRVc@cluster0.9a7aivf.mongodb.net/'
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri,option)

.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))


// import routes
const authRoutes=require('./routes/auth.js');
const dashboardRoutes = require('./routes/dashboard.js');
const verifyToken = require('./routes/validate-token.js');
const emailservices = require('./email_services/index.js')

// route middlewares
app.use('/api/User', authRoutes);
app.use('/api/dashboard', verifyToken, dashboardRoutes);
app.use('/index',emailservices);
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {

    console.log(`servidor andando en: ${PORT}`)
})

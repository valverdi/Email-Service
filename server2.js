require ('dotenv').config()
const express = require('express')
const app = express()
const JWT = require('jsonwebtoken')
app.use(express.json())
const posts = [
    {
        username: 'Tomas',
        tittle: 'post 1'
    },
    {
        username: 'Mateo',
        tittle:'post 2'
    }
]
app.get('/posts',authenticateToken,(req,res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})
app.post('/login',(req,res) => 
{
    //authenticate User
    const username = req.body.username
    const user = { name: username}
    const accesToken=JWT.sign(user, process.env.ACCES_TOKEN_SECRET)
    res.json({accesToken: accesToken})
})

function authenticateToken(req, res, next )
{
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split('')[1]
    if (token == null) return res.sendStatus(401)
    
    JWT.verify(token, process.env.ACCES_TOKEN_SECRET,(err,user)=> 
    {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })   
}
app.listen(3000)
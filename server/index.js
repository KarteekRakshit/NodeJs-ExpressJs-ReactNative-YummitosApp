const express = require('express')
const dataList = require('./data')
var bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/login', (req, res) => {
    console.log(req.body)
    if (req.body.username == "admin" && req.body.password == "admin") {
        res.send({
            access: true,
            message: "Login Successfull"
        })
    } else {
        res.send({
            access: false,
            message: "Login Failed"
        })
    }

})
app.get('/api/dataList', (req, res) => res.send(dataList))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
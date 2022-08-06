
const express = require('express')
const app = express()
const cors = require('cors')
const generateUserList = require('./user_creator');

app.use(cors())
app.use(express.json())

app.get("/users", (req, res) => {
    const page = parseInt(req.query.page || "1");
    const countryCode = req.query.countryCode || "us"
    const errCoef = parseFloat(req.query.errCoef || "0.0");
    const seed = parseInt(req.query.seed || "1");
    res.json({
        status: "ok", users: generateUserList(page, countryCode, errCoef, seed),
    });
});

const PORT = process.env.PORT || 5000 
app.listen(PORT, () => console.log('Server is running'))


require("dotenv").config();
const express = require("express");
const cors = require('cors')
const db = require('./db')


const app = express();

app.use((req, res, next) => {
    // const origin = req.get('origin');
  
    // TODO Add origin validation
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  });

app.get("/getData", async (req, res) => {

    try{
        const results = await db.query("SELECT * FROM transaction");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                transactions: results.rows,
            },
        });
    }catch(error){
        console.log(error);
    }
});

app.get("/getData/limit", async (req, res) => {

    try{
        const results = await db.query("SELECT sender, credit_amount, debit_amount FROM transaction limit 50");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                transactions: results.rows,
            },
        });
    }catch(error){
        console.log(error);
    }
});



const  port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server is up and listening on port ", port);
});
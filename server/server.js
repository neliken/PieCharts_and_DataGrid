require("dotenv").config();
const express = require("express");
const cors = require('cors')
const db = require('./db')


const app = express();

app.use(cors());

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
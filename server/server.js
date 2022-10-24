require("dotenv").config();
const express = require("express");
const cors = require('cors')
const db = require('./db');


const app = express();

app.use(cors({
    origin: '*',
}));


app.get("/getData", async (req, res) => {

    try{
        const results = await db.query("SELECT * FROM transactions");
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

app.get("/getData/pieChart", async (req, res) => {

    try{
        const results = await db.query('select sender, sum(debit_amount) AS "sum_debit", sum(credit_amount) As "sum_credit" from transactions group by sender');
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



const  port = 4000;
app.listen(port, () => {
    console.log("Server is up and listening on port ", port);
});
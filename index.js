import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8081, ()=> {
    console.log("tunaskiza");
})

//establishing mysql db connection...

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USERNAME
})

//First REST API getting data from the database
app.get('/',(req,res) => {
    const sql = "SELECT * FROM customers";
    db.query(sql, (err, result) => {
        if(err) return res.json(err);
        return res.json(result)
    })
})

//second post api sending data to the database
app.post('/customer',(req, res)=> {
    const sql = "INSERT INTO customers (`Name`,`Email`) VALUES(?)";
    console.log(req.body)
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)
    })
})


//read customer details
app.get('/read/:id',(req,res) => {
    const sql = "SELECT * FROM customers WHERE CustomerId=?";

    const id = req.params.id;


    db.query(sql, [id], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)
    })
})


//updating customer details
app.put('/edit/:id', (req,res) => {
    const sql = 'UPDATE customers SET `Name`=?, `Email`=? WHERE CustomerId=?'
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)

    })
})

//deleting a record from the db
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM customers WHERE CustomerId= ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)

    })
})
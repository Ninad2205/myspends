// const express = require('express');
// const app = express();
// const port = 4000;
// const path = require("path");
// const session=require("express-session");
// const flash=require("connect-flash");

// //require express session
// const sessionOptions={
//     secret:"mysupersecretcode",
//     resave:false,
//     saveUninitialized:true, 
//     cookie:{
//         expires:Date.now() + 7*24*60*60*1000,
//         maxAge: 7*24*60*60*1000,
//         httpOnly:true,
//     }
    
// };

// app.use(session(sessionOptions));
// app.use(flash());

// app.use((req,res,next)=>{
//     res.locals.success=req.flash("success");
//     res.locals.error=req.flash("error");

//     next();
// })

// // Get the client
// const mysql = require('mysql2');
// //get the faker
// const { faker } = require('@faker-js/faker');

// //using method override
// const methodOverride = require("method-override");

// app.use(methodOverride("_method"));
// app.use(express.urlencoded({ extended: true }));


// //specifing the views and public folder path
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

// app.get("/", (req, res) => {
//     // res.send("This is root");
//     let q = "select count(*) from money";
//     try {
//         connection.query(q, (err, result) => {
//             if (err) throw err;
//             let count = result[0]['count(*)'];
            
//             res.render("home.ejs", { count });
//             req.flash("success","Wages added successfully !");

//         });
//     } catch (err) {
//         console.log(err);
//         res.send("some error in database");
//     }
// });





// //to show wages
// app.get("/showAll", (req, res) => {
//     let q = "select * from money";
//     try {
//         connection.query(q, (err, moneys) => {
//             if (err) throw err;
//             res.render("show.ejs", { moneys });
//         });
//     } catch (err) {
//         console.log(err);
//         res.send("some error occured in showAll route db");
//     }

// });

// //Edit wages
// app.get("/wage/:id/edit", (req, res) => {
//     let { id } = req.params;
//     let q = `select * from money where id='${id}'`;
//     try {
//         connection.query(q, (err, result) => {
//             if (err) throw err;
//             // console.log(result[0]);
//             let money = result[0];
//             res.render("edit.ejs", { money });
//         });
//     } catch (err) {
//         console.log(err);
//         res.send("some error occured in edit route db");
//     }

// });

// //updating info
// app.patch("/wage/:id", (req, res) => {
//     let { id } = req.params;
//     let { nameOfItem: formname, price: newprice, date: formdate, paymentMode: mode } = req.body;

//     let q = `UPDATE money SET nameOfItem='${formname}', price='${newprice}', date='${formdate}', paymentMode='${mode}' WHERE id='${id}'`;
//     try {
//         connection.query(q, (err, result) => {
//             if (err) throw err;
//             res.redirect("/showAll");
//         });
//     } catch (err) {
//         console.log(err);
//         res.send("Some error occurred in the update route db");
//     }
// });
// //delete route
// // app.get("/wage/:id/delete",(req,res)=>{
// //     let {id}=req.params;
// //     let q =`select * from money where id='${id}'`;
// //     try{
// //       connection.query(q,(err,result)=>{
// //         if(err) throw err;
// //         // console.log(result[0]);
// //         let wage=result[0];
// //         res.render("delete.ejs",{wage});

// //       });
// //     }catch(err){
// //       console.log(err);
// //       res.send("some error occured in show route db");
// //     }

// //   });

// // //delete in DB route
// app.delete("/wage/:id",(req,res)=>{
//     let {id}=req.params;
    
//     let q =`SELECT * FROM money WHERE id='${id}'`;
//     try{
//       connection.query(q,(err,result)=>{
//         if(err) throw err;
//         // console.log(result[0]);
//         let wage=result[0];
        

//           let q2 =`delete from money where id='${id}'`;
//           connection.query(q2,(err,result)=>{
//           if(err) throw err;   

//           else{
//             // res.send(result);
//           res.redirect("/");
//           }

//         });

        
//       });
//     }catch(err){
//       console.log(err);
//       res.send("some error occured in show route db");
//     }

//   });


// //new student route
// app.get("/newspend",(req,res)=>{
//   // res.send("New student");
//   res.render("new.ejs");
// });

// app.post("/newspend",(req,res)=>{
//   let {id,nameOfItem,price,paymentMode,date}=req.body;
//   // let id=faker.string.uuid();
//   let q=`INSERT INTO money (id,nameOfItem,price,paymentMode,date) VALUES ('${id}','${nameOfItem}','${price}','${paymentMode}','${date}') `;
//   try{
//     connection.query(q,(err,result)=>{
//       if(err){
//         console.log(err.sqlMessage);
//         return res.redirect("/error");
//       }
//       console.log("Added new spend successfully...");
//       res.redirect("/showAll");
//     });
//   }catch(err){
//     console.log(err);
//     res.send("some error occured in db");
//   }

// })

// //error route
// app.get("/error",(req,res)=>{
//   res.render("error.ejs");
// });

// app.get("*", function(req, res){
//   res.send("<h1>404 not found</h1>")
// })
// app.listen(port, () => {
//     console.log(`app listening on port ${port}!`);
// });

// // Create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'dailyWage',
//     password: 'Ninad@8767046619',
// });







//modified code from chatgpt

const express = require('express');
const app = express();
const port = 4000;
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const mysql = require('mysql2');
const methodOverride = require("method-override");
const cors = require('cors');  // Import the CORS module

// Use environment variables for sensitive information
require('dotenv').config();

// Setup session options
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(cors()); 
// app.use(express.static('public'));


// Middleware setup
app.use(session(sessionOptions));
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// View engine and paths
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dailyWage',
    password: process.env.DB_PASSWORD,
});

connection.connect(err => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to database.");
});

// Routes
app.get("/", (req, res) => {
    const q = "SELECT COUNT(*) AS count FROM money";
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            req.flash("error", "Error fetching data from database.");
            return res.redirect("/error");
        }
        const count = result[0].count;
        req.flash("success", "Wages retrieved successfully.");
        res.render("home.ejs", { count });
    });
});
app.get("/testing",(req,res)=>{
  res.send("Working...");
});

app.get("/showAll", (req, res) => {
    const q = "SELECT * FROM money";
    connection.query(q, (err,moneys) => {
        if (err) {
            console.log(err);
            req.flash("error", "Error fetching data from database.");
            return res.redirect("/error");
        }
        
        req.flash("success", "Wages displayed successfully.");
        res.render("show.ejs", { moneys });
    });
});

app.get("/wage/:id/edit", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM money WHERE id = ?";
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            req.flash("error", "Error fetching wage data from database.");
            return res.redirect("/error");
        }
        req.flash("success", "Wage data retrieved successfully.");
        res.render("edit.ejs", { money: result[0] });
    });
});

app.patch("/wage/:id", (req, res) => {
    const { id } = req.params;
    const { nameOfItem, price, date, paymentMode } = req.body;
    const q = `UPDATE money SET nameOfItem = ?, price = ?, date = ?, paymentMode = ? WHERE id = ?`;
    connection.query(q, [nameOfItem, price, date, paymentMode, id], (err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Error updating wage data in database.");
            return res.redirect("/error");
        }
        req.flash("success", "Wage updated successfully.");
        res.redirect("/showAll");
    });
});

app.delete("/wage/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM money WHERE id = ?";
    connection.query(q, [id], (err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Error deleting wage from database.");
            return res.redirect("/error");
        }
        req.flash("success", "Wage deleted successfully.");
        res.redirect("/");
    });
});

app.get("/newspend", (req, res) => {
    res.render("new.ejs");
});

app.post("/newspend", (req, res) => {
    const { id, nameOfItem, price, paymentMode, date } = req.body;
    const q = `INSERT INTO money (id, nameOfItem, price, paymentMode, date) VALUES (?, ?, ?, ?, ?)`;
    connection.query(q, [id, nameOfItem, price, paymentMode, date], (err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Error adding new spend to database.");
            return res.redirect("/error");
        }
        req.flash("success", "New spend added successfully.");
        res.redirect("/showAll");
    });
});

app.get("/error", (req, res) => {
    res.render("error.ejs");
});

app.get("*", (req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>");
});

// Server listening
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

var express = require('express')
var app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));
var path = require('path');
var bodyparser = require("body-parser");
var session = require("express-session");
var { v4: uuidv4 } = require("uuid");
var connection  = require('./lib/db');
var router = require('./router');
var mysql = require('mysql');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
 var logger = require('morgan');
 var createError = require('http-errors');

 var customersRouter = require('./routes/customers');
 var productsRouter = require('./routes/products');
 

 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({ extended: true }))
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 
 // load static assets
 app.use('/static', express.static(path.join(__dirname, 'public')))
 app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
 
 app.use(session({
     secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
     resave: false,
     saveUninitialized: true
 }));
 
 app.use('/route', router);
 app.use(flash());
 app.use(expressValidator());
 app.use('/customers', customersRouter);
 app.use('/products', productsRouter);

 
 
 
 
 // home route
 app.get('/x', (req, res) =>{
     res.render('base', { title : "Login System"});
 })
 const data = [
     {id: 1, name:"iphone 10", price: 30000, isActive: true, imageUrl:"1.jpg"},
     {id: 2, name:"iphone 11", price: 40000, isActive: false, imageUrl:"2.jpg"},
     {id: 3, name:"iphone 12", price: 50000, isActive: true, imageUrl:"3.png"},
 ];
 
 app.use("/urunler/:id",function(req, res){
     const urun = data.find(u => u.id == req.params.id);
     res.render("urun-detay", urun);
 });
 
 app.use("/urunler",function(req, res){
     res.render("urunler",{
         urunler: data
     });
 });
 
 app.use("/telefon",function(req, res){
     res.render("telefon",{
         urunler: data
     });
 });
 
 app.use("/pc1",function(req, res){
    res.render("pc1",{
        urunler: data
    });
});

app.use("/pc2",function(req, res){
    res.render("pc2",{
        urunler: data
    });
});

app.use("/pc3",function(req, res){
    res.render("pc3",{
        urunler: data
    });
});

app.use("/pc4",function(req, res){
    res.render("pc4",{
        urunler: data
    });
});

app.use("/pc5",function(req, res){
    res.render("pc5",{
        urunler: data
    });
});

app.use("/pc6",function(req, res){
    res.render("pc6",{
        urunler: data
    });
});

app.use("/pc7",function(req, res){
    res.render("pc7",{
        urunler: data
    });
});

app.use("/pc8",function(req, res){
    res.render("pc8",{
        urunler: data
    });
});

app.use("/tel1",function(req, res){
    res.render("tel1",{
        urunler: data
    });
});

app.use("/tel2",function(req, res){
    res.render("tel2",{
        urunler: data
    });
});

app.use("/tel3",function(req, res){
    res.render("tel3",{
        urunler: data
    });
});

app.use("/tel4",function(req, res){
    res.render("tel4",{
        urunler: data
    });
});

app.use("/tel5",function(req, res){
    res.render("tel5",{
        urunler: data
    });
});

app.use("/tel6",function(req, res){
    res.render("tel6",{
        urunler: data
    });
});

app.use("/tel7",function(req, res){
    res.render("tel7",{
        urunler: data
    });
});

app.use("/tel8",function(req, res){
    res.render("tel8",{
        urunler: data
    });
});

app.use("/ak1",function(req, res){
    res.render("ak1",{
        urunler: data
    });
});

app.use("/ak2",function(req, res){
    res.render("ak2",{
        urunler: data
    });
});

app.use("/ak3",function(req, res){
    res.render("ak3",{
        urunler: data
    });
});

app.use("/ak4",function(req, res){
    res.render("ak4",{
        urunler: data
    });
});

app.use("/ak5",function(req, res){
    res.render("ak5",{
        urunler: data
    });
});

app.use("/ak6",function(req, res){
    res.render("ak6",{
        urunler: data
    });
});

app.use("/ak7",function(req, res){
    res.render("ak7",{
        urunler: data
    });
});

app.use("/ak8",function(req, res){
    res.render("ak8",{
        urunler: data
    });
});

 app.use("/bilgisayar",function(req, res){
     res.render("bilgisayar",{
         urunler: data
     });
 });
 
 app.use("/admin",function(req, res){
     res.render("admin",{
         urunler: data
     });
 });
 
 
 app.use("/aksesuar",function(req, res){
     res.render("aksesuar",{
         urunler: data
     });
 });
 
 app.use("/sepet",function(req, res){
     res.render("sepet",{
         urunler: data
     });
 });
 
 app.use("/base",function(req, res){
     res.render("base",{
         urunler: data
     });
 });
 
 app.use("/404",function(req, res){
     res.render("404",{
         urunler: data
     });
 });
 
 app.use("/",function(req, res){
     res.render("index");
 });
 
 app.listen(3000,()=>{
 console.log("listenin on port 3000");
 });
 
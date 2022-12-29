var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');
/* GET home page. */
router.get('/', function(req, res, next) {
connection.query('SELECT * FROM products ORDER BY id desc',function(err,rows)     {
if(err){
req.flash('error', err); 
res.render('products',{page_title:"products - Node.js",data:''});   
}else{
res.render('products',{page_title:"products - Node.js",data:rows});
}
});
});

// SHOW ADD USER FORM
router.get('/add', function(req, res, next){    
// render to views/user/add.ejs
res.render('products/add', {
title: 'Add New products',
name: '',
price: '',
imageUrl: ''       
})
})
// ADD NEW USER POST ACTION
router.post('/add', function(req, res, next){    
req.assert('name', 'Name is required').notEmpty()           //Validate name
req.assert('price', 'price is required').notEmpty()
req.assert('imageUrl', 'A valid imageUrl is required').notEmpty()  //Validate email
var errors = req.validationErrors()
if( !errors ) {   //No errors were found.  Passed Validation!
var urun = {
name: req.sanitize('name').escape().trim(),
price: req.sanitize('price').escape().trim(),
imageUrl: req.sanitize('imageUrl').escape().trim()
}
connection.query('INSERT INTO products SET ?', urun, function(err, result) {
//if(err) throw err
if (err) {
req.flash('error', err)
// render to views/user/add.ejs
res.render('products/add', {
title: 'Add New products',
name: urun.name,
price: urun.price,
imageUrl: urun.imageUrl                    
})
} else {                
req.flash('success', 'Kayıt İşleminiz Başarıyla Gerçekleşti!');
res.redirect('/products/add');
}
})
}
else {   //Display errors to user
var error_msg = ''
errors.forEach(function(error) {
error_msg += error.msg + '<br>'
})                
req.flash('error', error_msg)        
/**
* Using req.body.name 
* because req.param('name') is deprecated
*/
res.render('products/add', { 
title: 'Add New products',
name: req.body.name,
price: req.body.price,
imageUrl: req.body.imageUrl
})
}
})
// SHOW EDIT USER FORM
router.get('/edit/(:id)', function(req, res, next){
    connection.query('SELECT * FROM products WHERE id = ' + req.params.id, function(err, rows, fields) {
    if(err) throw err
    // if user not found
    if (rows.length <= 0) {
    req.flash('error', 'products not found with id = ' + req.params.id)
    res.redirect('/products')
    }
    else { // if user found
    // render to views/user/edit.ejs template file
    res.render('products/edit', {
    title: 'Edit products', 
    //data: rows[0],
    id: rows[0].id,
    name: rows[0].name,
    price: rows[0].price,
    imageUrl: rows[0].imageUrl                    
    })
    }            
    })
    })
    // EDIT USER POST ACTION
    router.post('/update/:id', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()           //Validate nam           //Validate age
    req.assert('price', 'price is required').notEmpty()
    req.assert('imageurl', 'A valid imageUrl is required').notEmpty()  //Validate email
    var errors = req.validationErrors()
    if( !errors ) {   
    var urun = {
    name: req.sanitize('name').escape().trim(),
    price: req.sanitize('price').escape().trim(),
    imageUrl: req.sanitize('imageUrl').escape().trim()
    }
    connection.query('UPDATE products SET ? WHERE id = ' + req.params.id, urun, function(err, result) {
    //if(err) throw err
    if (err) {
    req.flash('error', err)
    // render to views/user/add.ejs
    res.render('products/edit', {
    title: 'Edit products',
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl
    })
    } else {
    req.flash('success', 'Data updated successfully!');
    res.redirect('/products');
    }
    })
    }
    else {   //Display errors to user
    var error_msg = ''
    errors.forEach(function(error) {
    error_msg += error.msg + '<br>'
    })
    req.flash('error', error_msg)
    /**
    * Using req.body.name 
    * because req.param('name') is deprecated
    */
    res.render('products/edit', { 
    title: 'Edit products',            
    id: req.params.id, 
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl
    })
    }
    })
    // DELETE USER
    router.get('/delete/(:id)', function(req, res, next) {
    var urun = { id: req.params.id }
    connection.query('DELETE FROM products WHERE id = ' + req.params.id, urun, function(err, result) {
    //if(err) throw err
    if (err) {
    req.flash('error', err)
    // redirect to users list page
    res.redirect('/products')
    } else {
    req.flash('success', 'products deleted successfully! id = ' + req.params.id)
    // redirect to users list page
    res.redirect('/products')
    }
    })
    })


module.exports = router;
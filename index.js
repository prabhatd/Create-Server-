var http = require("http");
var express = require("express");
var app=express();
var mysql= require('mysql');
var bodyParser= require('body-parser');


var connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'root',
    database :'tests'
});

connection.connect(function(err){
    if(err) throw err
    console.log('You are now connected with mysql database...')
})

var server = app.listen(3000,"127.0.0.1",function(){
    var host= server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/customer', function (req, res) {
    connection.query('select * from customer', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
 });

 app.get('/customer/:id', function(req,res){
     connection.query('select * from customer where Id=?',[req.params.id],function(error,results,fields){
         if(error) throw error;
         res.send(JSON.stringify(results));
     });
 });

//  app.post('/customer',function(req,res){
//      var params= req.body;
//      console.log(params);

//      connection.query('Insert into customer SET ?',params,function(error,results,fields){
//          if(error) throw error;
//          res.end(JSON.stringify(results));
//      });
//  });

// app.post('/customer', function (req, res) {
//     const {Id,Name,Address,Country,Phone,Created_on}  = req.body;
//     console.log(params);
//     var connection = db.connect();
//     const statement= `insert into customer (Id,Name,Address,Country,Phone,Created_on) values ('${Id}','${Name},'${Address}','${Country}','${Phone}','${Created_on}')`;
// //     connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
// //     if (error) throw error;
// //     res.end(JSON.stringify(results));
// //   });
// connection.query(statement,(error,result)=>{
// if(error) throw error;
// res.end(JSON.stringify(result));
// });
//  });

// app.post('/customer', function (req, res) {
//     const{Id,Name,Address,Country,Phone,Created_on} = req.body;
//     const statement = `insert into customer (Id,Name,Address,Country,Phone,Created_on) values ('${Id}','${Name}','${Address}','${Country}','${Phone}','${Created_on}')`;
//     var params  = req.body;
//     console.log(params);
//     connection.query(statement, function (error, results, fields) {
//        if (error) throw error;
//        res.end(JSON.stringify(results));
//      });
//  });

app.put('/customer', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.delete('/customer', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
 });
var express = require("express");
var app=express();

var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
    
});
app.get('/customer', function (req, res) {
    connection.query('select * from customer', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
 });
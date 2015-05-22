var express = require('express')
var app = express();
app.use(express.static(__dirname + '/app'));
app.listen(process.env.port || 3000);
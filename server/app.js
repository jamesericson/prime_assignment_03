var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
// Set up body parsing
// app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.listen(port, function() {
    console.log('Listening on ' + port);
});

// Expose public folder
app.use(express.static('public'));



app.post('/calc', function(req, res) {
    console.log('Recieved:', req.body);
    var x = parseInt(req.body.x);
    var y = parseInt(req.body.y)
    switch (req.body.type) {
      case 'add':
        var answer = x+y;
        break;
      case 'subtract':
        var answer = x - y;
        break;
      case 'multiply':
        var answer = x * y
        break;
      case 'divide':
        var answer = x / y;
        break;
      default:
    }
    var math = {answer: answer};
    console.log('answer is:', answer);
    res.send( math);
});

app.post('/add', function(req, res) {
    console.log('Recieved for addition:', req.body);
    var answer = parseFloat(req.body.x) + parseFloat(req.body.y);

    var math = {answer: answer};
    console.log('answer is:', answer);
    res.send( math);
});

app.post('/subtract', function(req, res) {
  console.log('Recieved for subtraction:', req.body);
  var answer = parseInt(req.body.x) - parseInt(req.body.y);

  var math = {answer: answer};
  console.log('answer is:', answer);
  res.send( math);
});

app.post('/multiply', function(req, res) {
  console.log('Recieved for multiplication:', req.body);
  var answer = parseInt(req.body.x) * parseInt(req.body.y);

  var math = {answer: answer};
  console.log('answer is:', answer);
  res.send( math);
});

app.post('/divide', function(req, res) {
  console.log('Recieved for division:', req.body);
  var answer = parseInt(req.body.x) / parseInt(req.body.y);

  var math = {answer: answer};
  console.log('answer is:', answer);
  res.send( math);
});

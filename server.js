var express = require('express');
var app = express();
var path = require('path');

//Server directories using virtual directories on server
app.use('/class-images', express.static('class-images'));
app.use('/css', express.static('css'));
app.use('/data', express.static('data'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/shared', express.static('shared'));
app.use('/tests', express.static('tests'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/SpecRunner.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/SpecRunner.html'));
});

app.listen(8080);
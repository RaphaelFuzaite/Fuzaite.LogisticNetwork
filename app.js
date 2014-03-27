var express = require('express');
var formidable = require('formidable');
var routes = require('./routes');
var api = require('./routes/network');
var http = require('http');
var path = require('path');

var app = module.exports = express();

app.set('port', process.env.PORT || 3080);

app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.multipart());
app.use(express.static(path.join(__dirname, 'views')));
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Network View
// index
app.get('/', routes.index);
// forms
app.get('/form/:name', routes.partials);

// Network API
// create
app.post('/api/network', api.create);
// retrieve
app.get('/api/network', api.retrieve);
// update
app.put('/api/network/:nome', api.update);
// delete
app.delete('/api/network/:nome', api.delete);
// get
app.get('/api/network/:nome', api.get);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
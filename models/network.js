var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/logistic-network');

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Erro de conexão!', err);
});

db.once('open', function() {
	console.log('Conexão aberta!');
});

var networkSchema = new mongoose.Schema({
	nome: { type: String, default: ''},
	rota: { type: String, default: ''}
});

var _model = mongoose.model('Network', networkSchema);

var create = function(req, res, data) {
	var model = new _model(data);

	model.save(function(err, data){
		if (err) {
			console.log('Erro: ', err);
		}

		console.log('Network added: ', data);
		makeResponse(res, data);
	});
};

var find = function(req, res){
  _model.find(function (err, networks) {
    if(err) {
      console.log(err);
    } else {
        makeResponse(res, networks);
    }
  });
};

var update = function(req, res, query, mod){
  _model.update(query, mod, function(err, network) {
    if(err) {
      console.log(err);
    } else {
      console.log('Network updated');
      makeResponse(res, network);
    }
  });
} ;

var get = function(req, res, query){
  _model.findOne(query, function (err, networks) {
    if(err) {
      console.log(err);
    } else {
      console.log(networks);
      makeResponse(res, networks);
    }
  });
};

var remove = function(req, res, query){
  _model.remove(query, function(err, network) {
    if(err) {
      console.log(err);
    } else {
      console.log('Network removed');
      makeResponse(res, network);
    }
  });
};

var makeResponse = function(res, data){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(JSON.stringify(data));
  res.end();
};

exports.create = create;
exports.find = find;
exports.update = update;
exports.get = get;
exports.delete = remove;
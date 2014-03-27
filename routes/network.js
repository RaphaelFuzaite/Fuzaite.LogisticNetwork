var _model = require("../models/network");

var network = {
	create : function(req, res) {
		_model.create(req, res, req.body);
	},
	retrieve : function(req, res) {
		_model.find(req, res);
	},
	update : function(req, res) {
		var nome = req.params.nome,
		    query = {nome: nome},
		    mod = req.body;

	    console.log(mod, query);

	    _model.update(req, res, query, mod);
	},
	delete : function(req, res) {
		var url = req.url,
			nome = req.params.nome,
			query = {nome: nome};

		_model.delete(req, res, query);
	},
	get : function(req, res) {
		var nome = req.params.nome,
  			query = {nome: nome};

  		_model.get(req, res, query);
	}
};

exports.create = network.create;
exports.retrieve = network.retrieve;
exports.update = network.update;
exports.delete = network.delete;
exports.get = network.get;
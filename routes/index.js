
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Página Inicial' });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  var title = name + ' Network';
  res.render('partials/' + name, { title: title.toUpperCase() });
};
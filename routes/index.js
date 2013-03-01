
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Filight Sample' });
};
exports.about = function(req, res){
    res.render('about', { title: 'About' });
};
exports.contact = function(req, res){
    res.render('contact', { title: 'Contact' });
};
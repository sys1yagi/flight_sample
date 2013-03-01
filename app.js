var express = require('express')
    , routes = require('./routes')
    , api = require('./routes/api')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});
//---------------------------------------------------------
//initialize router
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

app.get('/add', api.add_todo);
app.get('/load', api.load_todo_list);
app.get('/update', api.update_todo);
app.get('/remove', api.remove_todo);
app.get('/move', api.move_to);

//---------------------------------------------------------
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

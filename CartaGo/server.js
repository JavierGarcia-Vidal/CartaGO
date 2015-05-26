var express = require('express'),
    swig = require('swig');

var RedisStore = require('connect-redis')(express);

var server = express();

// Setup for render views
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');

// Add post, cookie and sessions
server.configure(function(){
    server.use(express.logger());
    server.use(express.cookieParser());
    server.use(express.bodyParser());
    server.use(express.session({
        secret : "no-register-user"
        store : new RedisStore({})
    }));
});

server.get('/', function(req, res){
    res.render('index');
});

server.get('/app', function(req, res){
    res.render('app', {user : req.body.username});
})

server.post('/sign_in', function(req, res){
    req.session.user = req.body.username;
    res.rendirect('/app');
});

server.listen(3000);
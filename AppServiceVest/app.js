let mongoose = require('mongoose');
let restify = require('restify');
let fs =require('fs');
let User = require(process.cwd()+'/AppServiceVest/models/User.js');
let routes = require(process.cwd()+'/AppServiceVest/routes/user.js');

let server = restify.createServer({
    name: 'APP'
})

server.listen(7521, '127.0.0.1', function () {
    console.log('%s listening at %s ', server.name, server.url);
})

//Exception
server.on('uncaughtException', function (request, response, route, error) {
    Utility.logError(request, error, "server.uncaughtException");
    response.send(200, error);
    response.end();
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    Utility.logError(null, err, "process.uncaughtException");
});

//Settings
server.use(restify.queryParser());
server.use(restify.pre.userAgentConnection());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.jsonp());


// server.post({ path: server.name + '/user/' }, function (req, res, next) {
//     res.send(200, { test: 'test' })
// });
server.post("/users",routes.createUser);// users的值
server.put("/users/updateUser/:id",routes.updateUser);
server.del("/users/delUser/:id",routes.delUSer);
server.get("/users/queryUser",routes.queryUser); //?id=
// server.get("/users/queryUser/:id",routes.queryUser);

module.exports = server;

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    Parser = new require('csvtojson').Converter,
    csvjson = require('csvjson'),
    path = require('path'),
    fs = require('fs');
app.listen(process.env.PORT);
io.origins('*:*');
io.sockets.setMaxListeners(0);
console.log('server listening on localhost:' + process.env.PORT);



io.sockets.on('connection', function(socket) {
    var data = fs.readFileSync(path.join(__dirname, '/statistics.csv'), { encoding : 'utf8'});
    var options = { delimiter : ','};
    socket.emit('connection-data', JSON.stringify(csvjson.toObject(data, options)));
    fs.watchFile(__dirname + '/statistics.csv', function(curr, prev) {
        var converter = new Parser({});
        converter.on("end_parsed", function(data) {
            socket.volatile.emit('demo-content-update', JSON.stringify(data));
        });
        require("fs").createReadStream(__dirname + '/statistics.csv').pipe(converter);
    });
});
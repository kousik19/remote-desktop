var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/view', (req, res) => {
    res.sendFile(__dirname + '/display.html');
})

io.on('connection', (socket)=> {

    socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("User joined in a room : " + roomId);
    })

    socket.on("screen-data", function(data) {
        data = JSON.parse(data);
        var room = data.room;
        var imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data', imgStr);
    })

    socket.on("mouse-move", function(data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-move", data);
    })

    socket.on("mouse-click", function(data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-click", data);
    })

    socket.on("type", function(data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("type", data);
    })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})
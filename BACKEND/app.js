const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
app.use(require('cors')())
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"],
    //   allowHeaders: ['Content-Type, Authorization, Content-Length, X-Requested-With'],
    //   credentials: true
    }
  });
// const path = require('path');


// app.use(express.static(path.join(__dirname, './public')));
app.get('/',(req,res)=>{
    res.json({
        status:true,
        time: 300
    })
})
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/client.html');
// });
// app.get('/controller', (req, res) => {
//     res.sendFile(__dirname + '/views/server.html');
// });

var name;
var room = 1;

io.on('connection', (socket) => {
    socket.emit('connection', null);
    console.log('user connected');

    // socket.on('joining msg', (username) => {
    //     name = username;
    //     if (name == "adminTT2021") {
    //         socket.join("room0");
    //         io.emit('chat message', `---${name} joined`);
    //         console.log("admin join");
    //     } else {
    //         socket.join("room" + room);
    //         room++;
    //         console.log(`${name} join romm ${room}`);
    //         io.emit('chat message', `---${name} joined`);
    //     }
    // });
    socket.on('submitAnswer', (data)=>{
        console.log("data:" + data.name +" "+ data.value);
    })
    socket.on('updateScore', (scoresList)=>{
        socket.broadcast.emit('updateScore', scoresList)
    })
    socket.on('nmtc-show-cipher', (cipher)=>{
        socket.broadcast.emit('nmtc-show-cipher', cipher)
    })
    socket.on('nmtc-show-key', (key)=>{
        socket.broadcast.emit('nmtc-show-key', key)
    })
    socket.on('nmtc-show-all-answer', (answer)=>{
        socket.broadcast.emit('nmtc-show-all-answer', answer)
    })
    socket.on('nmtc-show-team', (answer)=>{
        socket.broadcast.emit('nmtc-show-team', answer)
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        // io.emit('chat message', `---${name} left ---`);
    });
    // socket.on('chat message', (msg) => {
    //     socket.to("room0").emit('chat message', msg);
    // });
    // socket.on('chat server', (msg) => {
    //     socket.broadcast.emit('chat message', msg); //sending message to all except the sender
    // });
});

server.listen(4000, () => {
    console.log('Server listening on: 4000');
});
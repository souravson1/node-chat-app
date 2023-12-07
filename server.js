const express = require('express');
const app = express();
const http = require('http').createServer(app)

app.use(express.static(__dirname+ '/public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname+ '/index.html');
})


// Socket

const io = require('socket.io')(http);

io.on('connection', (socket)=>{
    console.log('Socket connected successfully...');
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
})

const PORT = process.env.PORT || 4500;
http.listen(PORT, ()=>{
    console.log(`Listening on port : ${PORT}`);
})

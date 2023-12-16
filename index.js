const express = require("express")
const { Socket } = require("socket.io")
const app = express()

const http = require('http').createServer(app)
const socketio = require('socket.io')(http)

http.listen(process.env.PORT || 3000, ()=> {
    console.log(`server started ${process.env.PORT || 3000}`)
})

app.use(express.static(__dirname + '/src'))

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
})

socketio.on('connection', (socket) =>{
    console.log('connected socket')

    socket.on('message', (msg) => {
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })

})
const express = require('express')// Express framework for HTTP server
const { Socket } = require('socket.io')// Socket.io for real-time communication

const app = express()
app.use(express.static(__dirname + '/public'))// Serving static files from the 'public' directory
const http = require('http').createServer(app) // Creating HTTP server instance

const PORT = process.env.PORT||3000

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

http.listen(PORT,() =>{
    console.log(`Server is list on port ${PORT}`)
})

//socket code
const users = {}// Object to store connected users
const io = require('socket.io')(http)// Creating a Socket.io instance


io.on('connection',(socket)=>{
// Handling event when a new user joins
    socket.on('new_user_joined',(name)=>{
        users[socket.id] = name;
        // Broadcasting message to all clients about the new user joining
        socket.broadcast.emit("user-joined",{
            user:users[socket.id],
            message:`${users[socket.id]} Joined the chat`
        })
    })
    // Handling event when a message is received
        socket.on('message',(msg) =>{
     // Broadcasting message to all clients
        socket.broadcast.emit('message',msg)
    })

    // Handling event when a client disconnects
    socket.on('disconnect',()=>{
         // Broadcasting message to all clients about the user leaving the chat
        socket.broadcast.emit('leave',{
            user:users[socket.id],
            message:`${users[socket.id]} left the chat`
        })
        delete users[socket.id]// Removing user from the list of connected users
    })
})
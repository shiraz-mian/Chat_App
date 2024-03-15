// Establishing a socket connection to the server
const socket = io()

// Getting DOM elements for message form and input field
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

// Selecting message area 
let messageArea = document.querySelector('.message__area')
 let username;
 
// Prompting user to enter their name and ensuring it is not empty
do{
    username = prompt('Please enter your name')
}while(!username)

// Emitting an event to the server that a new user has joined with their username
socket.emit('new_user_joined',username)
socket.on('user-joined',(msg) =>{
    appendMessage(msg,'user')
})

// Event listener for form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const message = messageInput.value.trim();

    if (!message) {
        alert("Please enter a message.");
        return; // Exit the function if message is empty
    }

    sendMessage(message);
    messageInput.value = ''; // Clear the input field after sending the message
});


function sendMessage(message){
    
    let msg = {
        user:username,
        message:message.trim()
    }
    //sending message  to the server
    messageForm.value=""
    socket.emit("message",msg)
}

// Function to append a message to the message area
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>@${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Event listener for receiving message events from the server
socket.on('message', (msg) => {
        appendMessage(msg, 'incoming')
})
// Event listener for receiving leave events from the server
socket.on('leave', (msg) => {
        appendMessage(msg, 'user')
})


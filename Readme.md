Real-Time Chat Application


This is a real-time chat application built using Node.js, Express, and Socket.io. The application allows users to join chat rooms, send messages, and receive messages instantly without the need to refresh the page.

Instructions
Running the Server
Clone the repository to your local machine.
Navigate to the project directory in your terminal.
Install dependencies by running npm install.
Start the server by running npm start or node server.js.
The server will start listening on port 3000 by default, or you can specify a port using the PORT environment variable.
Running the Client
Open a web browser.
Enter http://localhost:3000 (or the specified port) in the address bar.
Enter your username when prompted and start chatting!
Architecture and Concurrency
Architecture
The application follows a client-server architecture. The server is built using Node.js and Express, providing RESTful APIs and serving static files. Socket.io is used for real-time communication between the server and clients, enabling instant messaging functionality.

Concurrency Handling
Concurrency is managed using Socket.io's event-based communication. Each client connection is handled separately on the server, allowing multiple clients to interact concurrently. Messages are broadcasted to all connected clients in real-time, ensuring synchronized communication across the chat room.

Assumptions and Design Choices
Username Prompt
Users are prompted to enter their username before joining the chat. This ensures that messages can be attributed to specific users and provides a personalized chat experience.
Frontend Design
The frontend is designed to be minimalistic and intuitive, focusing on the primary functionality of sending and receiving messages. The design prioritizes ease of use and responsiveness for a seamless chat experience.
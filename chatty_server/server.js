const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// set the port to 3001
const PORT = 3001;

// Create a new express Server
const server = express()
  // Make the express server serve statc assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

  //Create the WebSockets server
  const wss = new SocketServer({ server });

  // Set up a callback that will run when a client connects to the server
  // When a client connects they are assigned a socket, represented by
  // the ws parameter in the callback.
  wss.on('connection', (ws) => {
    function updateClientCount() {
      let clientCount = {
        clientsId: uuid.v1(),
        clientSize: wss.clients.size,
        type: "clientsConnected"
      };

      return clientCount;
    }
    wss.broadcast(updateClientCount())

    ws.on('message', handleMessage);
    // Set up a callback for when a client closes the socket.
    ws.on('close', () => wss.broadcast(updateClientCount()));
  });

//Broadcast to all
  wss.broadcast = function broadcast(data) {
    newData = JSON.stringify(data);
    wss.clients.forEach(function(client) {
        client.send(newData);
    })
  }

// receive message, parse, add unique id, and print the data
  function handleMessage(message) {
    let msg = JSON.parse(message);

    if (msg.type === "postMessage") {
      msg.id = uuid.v1();
      msg.type = "incomingMessage";
    } else if (msg.type === "postNotification") {
      msg.id = uuid.v1();
      msg.type = "incomingNotification";
    }
    wss.broadcast(msg)
  };

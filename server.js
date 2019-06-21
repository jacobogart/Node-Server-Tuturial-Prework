const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('The HTTP server is running on Port 3000.')
});

server.on('request', (req, res) => {
  if (req.method === 'GET') {
    getAllMessages(res);
  } 
  
  else if (req.method === 'POST') {
    let newMessage = { id: new Date() };

    req.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    req.on('end', () => {
      addMessage(newMessage, res);
    })
  }
});

const getAllMessages = (res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World\n');
  res.end();
};

const addMessage = (newMessage, res) => {
  messages.push(newMessage);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(newMessage))
  res.end();
}
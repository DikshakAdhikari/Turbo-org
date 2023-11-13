//This is the server code
const http= require("http");
const WebSocketServer= require("websocket").server //We have a websocket server which allows us to do handshake

let connection= null;

const httpserver= http.createServer((req,res)=> {
    console.log("We have recieved a request");
});

const websocket= new WebSocketServer({
    "httpServer": httpserver //It needs http server for handshaking
});

websocket.on("request", request => {
    
  connection= request.accept(null, request.origin) //We can accept what client sends us, let anything it can accept so -> null
    connection.on("open", () => {
        console.log("Opened!!");
        // Send a message once the connection is open
    });
    //remember that send the server msg after the connection is open

    connection.on("close", () => console.log("Closed!!"))
    
    connection.on("message", message => {
        console.log(`Recieved message ${message.utf8Data}`);
    })
    
    sendEvery5seconds();

})

httpserver.listen(2000, ()=> console.log("My server is listening on port 2000"));

function sendEvery5seconds(){

    connection.send(`Message ${Math.random()}`)

    setTimeout(sendEvery5seconds, 5000);
}
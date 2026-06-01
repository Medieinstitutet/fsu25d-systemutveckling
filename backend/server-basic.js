import http from "node:http";

console.log("Start");

let server = http.createServer((req, res) => {
    console.log("Request");
    console.log(req.url);

    if(req.url === "/") {
        res.end('Hello world');
        return;
    }
    
    res.statusCode = 404;
    res.end('404 File not found');
});

server.listen(3000, () => {
    console.log("Started");
})
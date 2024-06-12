const http = require('http');
const getUsers = require('./modules/users')

const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://127.0.0.1`);
    const userName = url.searchParams.get("hello");

    if (request.url === '/users') {
        response.status = 200;
        response.statusMessage = "OK";
        response.setHeader("Content-Type", "application/json");
        response.write(getUsers())
        response.end();

        return;
    }
    if (userName) {
        response.status = 200;
        response.statusMessage = "OK";
        response.setHeader("Content-Type", "text/plain");
        response.write(`Hello, ${userName}.`)
        response.end();

        return;
    } else if (request.url === '/?hello' || request.url === '/?hello=') {
        response.statusCode = 400;
        response.statusMessage = "Bad Request";
        response.setHeader("Content-Type", "text/plain");
        response.write('Enter a name')
        response.end();

        return;
    }
    if (request.url === '/') {
        response.status = 200;
        response.statusMessage = "OK";
        response.setHeader("Content-Type", "text/plain");
        response.write("Hello world")
        response.end();

        return;
    } else {
        response.statusCode = 500;
        response.statusMessage = "Internal Server Error";
        response.setHeader("Content-Type", "text/plain");
        response.write("Something goes wrong")
        response.end();

        return;
    }


})

server.listen(port, hostname,
    () => {
        console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
    })
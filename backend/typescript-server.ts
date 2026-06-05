//Importera bibliotek
import express, {Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import expressSession from "express-session";
import fs from "node:fs";

//Importera egna filer
//import productsRouter from "./product-routes";

interface User {
    id : number
    name : string
}

let logIn = function(user:User):string|null {
    return null;
}

let sessionId:string|null;

sessionId = logIn({id: 123, name: "Mattias"});

if(sessionId !== null) {
    console.log(sessionId.length);
    sessionId.toLowerCase();
}


//Ladda in .env variabler
dotenv.config();

//Första konsolllogg bara för att se att node startar
console.log("Start");

//Skapa en server
let app = express();

//Använd cors så att vi kan göra requests från vite
app.use(cors());

app.use(express.static("public"));

app.use(expressSession({
    "secret": "not secure change me later",
    "resave": false,
    "saveUninitialized": false,
    "cookie": {
        "httpOnly": true,
        "maxAge": 60 * 60 * 1000
    }
}))

//Använd moduler för att parsa body i POST-anrop
app.use(express.json());
app.use(express.urlencoded());



//Använd vår egen products router
//app.use("/api/products", productsRouter);

//Lägg till endpoints direkt på servern
app.get("/", (req, res) => {
    res.send("Hello world<form method='POST'><input name='name3' /><input type='submit' /></form>");
});

app.get("/main.css", (req, res) => {
    res.send("html, body {border: 2px solid red}");
});

app.post("/", (req, res) => {

    let name:string = req.body.name;

    res.send(name.toUpperCase());
});

app.get("/api/me/", (req, res) => {
    res.json({"username": (req.session as any).username});
});

app.post("/api/login/", (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if(password === "qwerty123") {
        (req.session as any).username = username;
        res.json({"success": true});
        return;
    }

    res.json({"success": false});
});

app.post("/api/logout/", (req, res) => {

    (req.session as any).username = null;

    res.json({"success": false});
});

/*
app.get("/api/me/set/:id", (req, res) => {

    (req.session as any).userId = req.params.id;
    (req.session as any).secretCode = "qwceqcwe";

    res.json({"userId": req.params.id});
});
*/

app.get("/api/user/:userId/posts/:postId", (req, res) => {

    req.params.userId;
    
    res.json({});
});

app.get(/^\/files\/(.+)$/, (req, res) => {

    req.params[0];
    
    res.json({});
});

let count = 0;
app.get("/api/count/", (req, res) => {
    count++;
    res.json({"count": count});
});

let catchAllHtml:string = "";
fs.readFile("./public/index.html", (err, data) => {
    catchAllHtml = data.toString();
});

/*
let data = fs.readFileSync("./public/index.html");
catchAllHtml = data.toString();
*/

app.get(/^(.*)$/, (req, res) => {
    res.send(catchAllHtml);
});

//Använd port från .env eller 3000 om inte angiven
let port = process.env.PORT || 3000;

//Starta webservern
app.listen(port, () => {
    console.log("Listening to " + port);
})
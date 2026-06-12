//Importera bibliotek
import express, {Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import expressSession from "express-session";
import fs from "node:fs";
import {connect} from "./database";
import { ObjectId } from "mongodb";
import {connect as mysqlConnect} from "./mysql-database";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import {put} from "@vercel/blob";

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

app.get("/api/me/", async (req, res) => {
    let db = await connect();

    /*
    let user = await db.collection("users").findOne({
        _id: new ObjectId('6a26885d2d7887f0c6d8571d')
    });
    */

    let user = await db.collection("users").findOne({
        email: (req.session as any).username
    });
    console.log(user);

    res.json({"username": (req.session as any).username, data: user});
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

let diskStorage = multer.diskStorage({
    "destination": (req, file, cb) => {
        cb(null, "public/uploads")
    },
    "filename": (req, file, cb) => {
        let extension = path.extname(file.originalname);
        let fileName = crypto.randomUUID();
        cb(null, fileName + extension);
    }
})

let multerUpload = multer({
    "storage": multer.memoryStorage()
});

app.post("/api/image-upload", multerUpload.single("image"), async (req, res) => {
    console.log("/api/image-upload");
    console.log(req);
    console.log(req.body);
    console.log(req.file);

    let fileName = null;
    /*
    if(req.file) {
        fileName = req.file.originalname.split("/").join("-");
        fs.renameSync(req.file.path, "public/uploads/" + fileName);
    }
    */

    if(req.file) {
        let extension = path.extname(req.file.originalname);
        let putFileName = crypto.randomUUID();

        let result = await put(putFileName + extension, req.file.buffer, {access: "public"});

        fileName = result.url;
    }

    res.json({"url": fileName});
})


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

let start = async () => {
    /*
    let db = await connect();


    let ordersCollection = db.collection("orders");
    let ordersFindCursor = ordersCollection.find();
    let orders = await ordersFindCursor.toArray();
    

    let orders2 = await db.collection("orders").find().toArray();

    let filterOrders = await db.collection("orders").aggregate([
  {
    $lookup:
      {
        from: "orderStatus",
        localField: "status",
        foreignField: "_id",
        as: "statusObject"
      }
  },
  {
    $unset:
      "status"
  },
  {
    $unwind:
      {
        path: "$statusObject"
      }
  }
]).toArray();
    console.log(filterOrders);
    */

    /*
    let result = await db.collection("users").insertOne({
        "name": "Mattias",
        "email": "mattias@example.com"
    });
    console.log(result);
    */

    //await mysqlConnect();

    //Starta webservern
    app.listen(port, () => {
        console.log("Listening to " + port);
    })
}

start();



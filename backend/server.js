//Importera bibliotek
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Importera egna filer
import productsRouter from "./product-routes.js";

//Ladda in .env variabler
dotenv.config();

//Första konsolllogg bara för att se att node startar
console.log("Start");

//Skapa en server
let app = express();

//Använd moduler för att parsa body i POST-anrop
app.use(express.json());
app.use(express.urlencoded());

//Använd cors så att vi kan göra requests från vite
app.use(cors());

//Använd vår egen products router
app.use("/api/products", productsRouter);

//Lägg till endpoints direkt på servern
app.get("/", (req, res) => {
    res.send("Hello world<form method='POST'><input type='submit' /></form>");
});

app.post("/", (req, res) => {
    res.redirect('/sign-in/');
});

app.get("/api/me/", (req, res) => {
    res.json({"userId": 1});
});

let count = 0;
app.get("/api/count/", (req, res) => {
    count++; //
    res.json({"count": count});
});

//Använd port från .env eller 3000 om inte angiven
let port = process.env.PORT || 3000;

//Starta webservern
app.listen(port, () => {
    console.log("Listening to " + port);
})
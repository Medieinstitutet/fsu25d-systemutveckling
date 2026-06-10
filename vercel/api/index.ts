import express from "express";

const app = express();

app.get("/api/", (req, res) => {
    res.json({"test": true});
});

app.get(/^(.*)$/, (req, res) => {
    res.send("Hello from Vercel");
});

export default app;
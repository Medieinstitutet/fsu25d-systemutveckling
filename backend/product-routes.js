import {Router} from "express";

let productsRouter = new Router();

productsRouter.get("/", (req, res) => {

    res.json([
        {
            "id": 1,
            "name": "Shoe",
            "image": "https://example.com/..."
        }
    ]);
});

productsRouter.post("/", (req, res) => {

    let name = req.body["name"];

    res.json(
        {
            "id": 2,
            "name": name,
            "image": "https://example.com/..."
        });
});

export default productsRouter;
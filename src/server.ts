import "reflect-metadata"
import express from "express";

import "./database";

const app = express();

app.get("/", (req, res) => {
    return res.send("ok")
})
app.post("/test-post", (req, res) => {
    return res.send("Ola")
})

app.listen(3000, () => console.log("server is running..."))
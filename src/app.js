import express from "express";

//create a express app
const app = express();

app.get("/", (req, res) => {
  res.send("Praise The Lord Helleaujah");
});

export default app;

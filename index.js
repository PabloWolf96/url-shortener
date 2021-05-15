const express = require("express");
const app = express();
const server = require("http").Server(app);
const controller = require("./controllers/urls");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.redirect("https://github.com/PabloWolf96/url-shortener");
});
app.get("/:shorturl", controller.visitUrl);
app.post("/shorten", controller.createUrl);

server.listen(PORT, () => console.log("Server is running"));

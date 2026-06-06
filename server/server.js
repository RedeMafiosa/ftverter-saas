const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SaaS Server running on port " + PORT);
});
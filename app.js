const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const methodOverride =
require("method-override");


dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./views");

const connectDB = require("./Config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
methodOverride("_method")
);

// CSS Folder
app.use(
express.static(
path.join(__dirname,"css")
)
);

app.use(require("./Routes/authRoute"));
app.use(require("./Routes/productRoute"));

app.get("/", (req, res) => {
    res.render("home");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

app.set("view engine", "ejs")

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(require("./routes/authRoute"));
app.use(require("./routes/productRoute"));

app.get("/",(req,res)=>{
res.send('home.ejs');
});

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(
`Server Running on Port ${PORT}`
);
});
const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false})); //requesst in body si ile gelen bilgileri istenilen formatta, obje formatında query string in herhangi bir kütüphanesi bu işlemi yapsın.
//extended: true diyerek de gelen respone kontrolü yapılır.

const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

//sildik create() kismında
// const Blog =require("./models/blog");
// const Category =require("./models/category");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(userRoutes); 

// app.get('/', (req, res) => {
//     res.send("Ana sayfa");
// }); // burayı ekledimmmmmmmmmm


app.listen(3000, function() {
    console.log("listening on port 3000");
});
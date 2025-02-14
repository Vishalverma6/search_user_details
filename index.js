const express= require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/User");
const searchUserRoutes = require('./routes/SearchDetails');



// database connection
database.connect();


// middlewares
app.use(express.json());
app.use(cookieParser());


// routes 
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/search",searchUserRoutes);

// default Route
app.get("/", (req, res) =>{
    return res.json({
        success:true,
        message:"Your server is up and running...",
    });
} )

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})
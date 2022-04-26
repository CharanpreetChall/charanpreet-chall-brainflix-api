require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.static('public'))
app.use(express.json());
app.use(cors());

//Routes
const videosRoutes= require('./routes/videos');
app.use("/videos", videosRoutes)


//Listen
app.listen(PORT, () => {
    console.log("server is running on port" + PORT)
})


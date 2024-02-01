require("dotenv").config();

const express = require('express');
const cors = require('cors');
const { mongodbConnection } = require("../config/db");
const authRoutes = require("../routes/auth.routes");
const booksRoutes = require("../routes/book.routes");

const app = express();

// middlewares
app.use(express.json());
const corsOrigin ={
    origin:'https://frontend-eight-phi-39.vercel.app', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));



//routes
app.use("/auth", authRoutes);
app.use("/books", booksRoutes);

app.get('/', (req, res)=>{
    res.send('welcome to the server')
})



const PORT = process.env.PORT || 4134;
app.listen(PORT, async () => {
    try {
        console.log("listening on port:   http://localhost:8080");
        console.log("Connecting to MongoDB ... ")
        await mongodbConnection;
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("Error while connecting to MONGODB");
    }
});
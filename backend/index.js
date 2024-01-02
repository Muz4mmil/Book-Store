import express from 'express';
import {PORT, mongoDbURL} from './config.js'
import mongoose from 'mongoose'
import { Book } from './model/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
import path from 'path'


const app = express();

app.use(express.json())
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
app.use(cors(corsOptions));

app.get("/", (req, res)=>{
    return res.status(234).send("<div>Hello MERN</div>")
})

app.use('/books', booksRoute)


app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

mongoose
    .connect(mongoDbURL)
    .then(()=>{
        console.log("Connected to DB");
        app.listen(PORT, ()=>{
            console.log("Running");
        })
    })
    .catch((error)=>{
        console.log(error);
    })
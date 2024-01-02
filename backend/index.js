import express from 'express';
import {PORT, mongoDbURL} from './config.js'
import mongoose from 'mongoose'
import { Book } from './model/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


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

mongoose
    .connect('mongodb+srv://root:root@book-project-mern.wfrnhsh.mongodb.net/books-collection?retryWrites=true&w=majority')
    .then(()=>{
        console.log("Connected to DB");
        app.listen(5555, ()=>{
            console.log("Running");
        })
    })
    .catch((error)=>{
        console.log(error);
    })
import express from "express";
const app = express();
import web from "./routes/router.js";
import bodyparser from "body-parser";
const port = process.env.port || 8000;
import {join} from 'path';
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// app.re('/', web); 

app.use('/', web);
app.use(express.static(join(process.cwd(), 'public')));

app.listen(port, ()=>{
    console.log(`ServerRunning on http://localhost:${port}`)
});
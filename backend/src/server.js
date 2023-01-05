import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import cors from 'cors';
import db from './db';
import routes from './routes';
import express from 'express';
import http from "http";
import wsConnect from './wsConnect';
import WebSocket from "ws";
import {v4 as uuidv4} from 'uuid';

// db.connect();
// dotenv.config();

// const app = express();

// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })

// const DB = mongoose.connection;

// DB.once('open', () => {
//   wss.on("connection", (ws) => {
//     ws.id = uuidv4();
//     ws.box = '';
//     ws.onmessage = wsConnect.onMessage(wss, ws);
//     console.log("Websocket connected!")
//   });
//  });

//  const port = process.env.PORT || 4001;
//  server.listen(port, () => { console.log(`Example app listening on port ${port}!`) });

/*app.get('/', (req, res) => {
 res.send('Hello, World!');
});*/

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4001;

app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);
app.use('/', routes);

// mongoose.connect(process.env.MONGO_URL, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//  })
//  .then((res) => console.log("mongo db connection created"));


db.connect();

//const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const DB = mongoose.connection

DB.once('open', () => {
 console.log("MongoDB connected!");
 wss.on("connection", (ws) => {
    ws.id = uuidv4();
    ws.box = '';
 // Define WebSocket connection logic
 //wsConnect.initData(ws);
    ws.onmessage = wsConnect.onMessage(wss, ws);
 //wsConnect.onMessage(ws);
 console.log("WebSocket Connected");
 });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { console.log(`Example app listening on port ${PORT}!`) });
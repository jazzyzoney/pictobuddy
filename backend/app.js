import express from "express" 
import "dotenv/config" 
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

import session from "express-session" 

const app = express()

const server = http.createServer(app)

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
})) 

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
})

app.use((req, res, next) => {
    req.io = io
    next()
})

//access router 
import storyRouter from "./routers/storyRouter.js" 
app.use(storyRouter) 

app.all("/{*splat}", (req, res) => { 
    res.send(`<h1>404</h1> <h3>Didn't find a matching route</h3>`)
})

const PORT = 8080 
server.listen(PORT, () => console.log("Server running on port", PORT)) 
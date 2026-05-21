import express from "express" 
import "dotenv/config" 
import cors from "cors"

import session from "express-session" 

const app = express()

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

import storyRouter from "./routers/storyRouter.js" 
app.use(storyRouter) 

//fallback
app.all("/{*splat}", (req, res) => { 
    res.send(`<h1>404</h1> <h3>Didn't find a matching route</h3>`)
})

const PORT = 8080 
app.listen(PORT, () => console.log("Server running on port", PORT)) 
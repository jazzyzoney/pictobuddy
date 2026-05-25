import express from "express" 
import "dotenv/config" 
import cors from "cors"

import session from "express-session" 

const app = express()

app.use(express.json())

app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://pictobuddy-l7d7.onrender.com'
    ],
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

// backend/app.js
import db from "./database/connection.js";

// backend/app.js

async function autoWipeExpiredData() {
    console.log("🧹 Running scheduled database maintenance check...");
    try {
        // 1. Auto-create tables on launch if they don't exist yet (Prevents "no such table" errors)
        await db.execute(`
            CREATE TABLE IF NOT EXISTS stories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                raw_text TEXT,
                pictograms_json TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS schedules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                schedule_json TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Now run your 30-day auto-wipe commands safely
        const cleanStories = await db.execute(
            "DELETE FROM stories WHERE created_at < datetime('now', '-30 days')"
        );
        const cleanSchedules = await db.execute(
            "DELETE FROM schedules WHERE created_at < datetime('now', '-30 days')"
        );
        
        if (cleanStories.rowsAffected > 0 || cleanSchedules.rowsAffected > 0) {
            console.log(`🗑️ Successfully deleted expired rows! Stories: ${cleanStories.rowsAffected}, Schedules: ${cleanSchedules.rowsAffected}`);
        } else {
            console.log("✨ Maintenance complete: No expired data found.");
        }
    } catch (err) {
        console.error("❌ Database initialization or auto-wipe cleanup task failed:", err.message);
    }
}

// 1. Run the cleanup immediately every time your server wakes up or restarts
autoWipeExpiredData();

// 2. Set an interval to re-verify every 12 hours while the server stays awake
const TWELVE_HOURS = 12 * 60 * 60 * 1000;
setInterval(autoWipeExpiredData, TWELVE_HOURS);

const PORT = process.env.PORT || 8080 
app.listen(PORT, () => console.log("Server running on port", PORT)) 
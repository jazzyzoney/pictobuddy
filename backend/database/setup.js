import db from './connection.js';
import bcrypt from 'bcrypt';
import "dotenv/config"; 

const saltRounds = 12;

async function setup() {
    // 1. Ryd op i gamle tabeller (valgfrit under udvikling)
    await db.exec("DROP TABLE IF EXISTS users");
    await db.exec("DROP TABLE IF EXISTS stories"); // Vores nye tabel

    // 2. Opret Users-tabel (Genbrug fra Bratz)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            username TEXT,
            role TEXT DEFAULT 'user',
            login_count INTEGER DEFAULT 0
        );
    `);

    // 3. Opret Stories-tabel (Vores nye kerne-tabel)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS stories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT,
            raw_text TEXT,
            pictograms_json TEXT, -- Her gemmer vi hele arrayet som en JSON-streng
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);

    // 4. Seeding af admin (Ligesom i dit Bratz-projekt)
    const adminPassword = process.env.ADMIN_PASS || 'admin123';
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    try {
        await db.run(
            `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
            ['Admin', 'admin@pictogram.dk', passwordHash, 'admin']
        );
        console.log("✅ Admin-bruger oprettet.");
    } catch (err) {
        // Ignorer hvis brugeren findes
    }

    console.log("✅ Database setup fuldført med 'stories' tabel.");
}

setup();
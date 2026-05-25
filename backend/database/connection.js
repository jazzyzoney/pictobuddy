// backend/database/connection.js
import { createClient } from "@libsql/client";
import "dotenv/config";

// Detects if you are testing locally or live on Render
const isProduction = process.env.NODE_ENV === 'production';

const connection = createClient({
    url: isProduction ? process.env.TURSO_DATABASE_URL : "file:../auth.db",
    authToken: isProduction ? process.env.TURSO_AUTH_TOKEN : undefined,
});

console.log(`✅ Connected securely to ${isProduction ? 'Turso Cloud' : 'Local SQLite file'}`);

export default connection;
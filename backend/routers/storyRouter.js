import { Router } from 'express'
import db from '../database/connection.js' // Genbrug din db-forbindelse
import Groq from "groq-sdk" // Du har allerede denne dependency

const router = Router()

router.post('/api/stories/generate', async (req, res) => {
    const { text } = req.body

    if (!text) return res.status(400).send("Ingen tekst modtaget.")
    if (!process.env.GROQ_API_KEY) {
        return res.status(500).send("GROQ_API_KEY mangler i miljøvariabler.")
    }

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
        // 1. AI AGENT: Udtræk keywords
        // Her bruger vi samme prompt-logik som i Bratz, men fokuseret på keywords
        const prompt = `Du er en pædagogisk assistent. Analyser denne tekst og returner KUN en JSON-liste 
                        med de 5 vigtigste substantiver (navneord) til piktogrammer.
                        Tekst: "${text}"
                        Svar kun med JSON array, f.eks: ["skole", "mad", "sove"]`

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile", // Samme model som i Bratz
        })

        const keywords = JSON.parse(completion.choices[0]?.message?.content || "[]")

        // 2. ARASAAC INTEGRATION: Find piktogrammer for hvert keyword
        const pictogramSequence = []

        for (const word of keywords) {
            // Vi kalder det offentlige ARASAAC API, som du testede tidligere
            const response = await fetch(`https://api.arasaac.org/api/pictograms/da/search/${encodeURIComponent(word)}`)
            const data = await response.json()

            if (data && data.length > 0) {
                const id = data[0]._id // Tag det første match
                pictogramSequence.push({
                    keyword: word,
                    url: `https://api.arasaac.org/api/pictograms/${id}`,
                    id: id
                })
            }
        }

        // 3. DATABASE: Gem historien (valgfrit trin til dit arkiv)
        // Vi bruger db.run ligesom i blogRouter
        const result = await db.run(
            `INSERT INTO stories (title, raw_text, pictograms_json) VALUES (?, ?, ?)`,
            [text.substring(0, 30) + "...", 
            text,
            JSON.stringify(pictogramSequence)]
        )

        res.json({ 
            success: true, 
            storyId: result.lastID, 
            pictograms: pictogramSequence 
        })

    } catch (error) {
        console.error("Fejl i Storyteller:", error)
        res.status(500).send("Agenten eller API'et fejlede.")
    }
})

export default router
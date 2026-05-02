<script>
    import { onMount } from 'svelte';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';

    let storyText = "";
    let loading = false;
    let pictograms = []; // Her gemmer vi resultatet fra backenden

    async function generateStory() {
        if (!storyText.trim()) {
            toastr.warning("Skriv venligst noget tekst først ✍️");
            return;
        }

        loading = true;
        pictograms = [];

        try {
            // Vi kalder din nye router-sti (husk credentials: 'include' hvis du bruger sessioner)
            const response = await fetch('http://localhost:8080/api/stories/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: storyText }),
                credentials: 'include' 
            });

            const data = await response.json();

            if (data.success) {
                pictograms = data.pictograms;
                console.log("📸 Piktogrammer modtaget i Svelte:", pictograms);
                toastr.success("Historie genereret! ✨");
            } else {
                toastr.error("Fejl: " + (data.error || "Kunne ikke generere piktogrammer"));
            }
        } catch (error) {
            console.error("Netværksfejl:", error);
            toastr.error("Kunne ikke forbinde til backenden.");
        } finally {
            loading = false;
        }
    }
</script>

<main>
    <h1>Lav en ny historie</h1>
    <p>Skriv hvad barnet skal lave, så finder AI'en piktogrammerne.</p>

    <div class="input-section">
        <textarea 
            bind:value={storyText} 
            placeholder="F.eks.: Først skal du børste tænder, og bagefter skal du i seng..."
            disabled={loading}
        ></textarea>
        
        <button on:click={generateStory} disabled={loading}>
            {#if loading}
                Tænker... 💭
            {:else}
                Generer piktogrammer ✨
            {/if}
        </button>
    </div>

    {#if pictograms.length > 0}
        <div class="story-result">
            <h2>Din visuelle plan:</h2>
            <div class="pictogram-grid">
                {#each pictograms as pic}
                    <div class="pic-card">
                        <img src={pic.url} alt={pic.keyword} />
                        <p>{pic.keyword}</p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }

    .input-section {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 40px;
    }

    textarea {
        width: 100%;
        min-height: 120px;
        padding: 15px;
        border-radius: 10px;
        border: 2px solid #ddd;
        font-family: inherit;
        font-size: 1rem;
    }

    button {
        background-color: #2c3e50; /* Vælg en mere pædagogisk farve her */
        color: white;
        padding: 15px;
        border: none;
        border-radius: 30px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: transform 0.2s;
    }

    button:hover {
        transform: scale(1.02);
    }

    .pictogram-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        margin-top: 20px;
    }

    .pic-card {
        background: white;
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        width: 150px;
    }

    .pic-card img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }

    .pic-card p {
        margin-top: 10px;
        font-weight: bold;
        text-transform: capitalize;
    }
</style>
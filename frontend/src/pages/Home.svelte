<script>
    import { currentPage } from '../stores/pageStore.js';
</script>

<div class="home-container">
    <section class="hero">
        <h1>Velkommen til Pictogram Storyteller</h1>
        <p>Hjælp dit barn med at få struktur på hverdagen ved hjælp af AI-genererede piktogrammer.</p>
        <button on:click={() => $currentPage = 'create'}>Kom i gang ✨</button>
    </section>
</div>

<style>
    .home-container { text-align: center; padding: 50px; }
    .hero { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    h1 { color: #d63384; }
    button { background: #d63384; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; margin-top: 20px; font-weight: bold; }
</style>
<script>
    import { currentPage } from '../stores/pageStore.js';

    function goToCreate() {
        window.location.hash = '#/create-story';
        currentPage.set('create-story');
    }
</script>

<div class="home-container">
    <h1>Om PictoBuddy</h1>

    <p>PictoBuddy hjælper forældre og pædagoger med at skabe visuelle historier og skemaer ved hjælp af AI-genererede piktogrammer. Tjenesten er designet til at gøre hverdagens rutiner mere forudsigelige og lettere at forstå for børn.</p>

    <h2>Sådan bruger du det</h2>
    <ol>
        <li>Gå til "Ny Historie" eller "Nyt Ugeskema" for at generere en ny historie eller skema.</li>
        <li>Beskriv aktiviteten eller vælg ud fra kategorier — AI genererer forslag til piktogrammer og tekst.</li>
        <li>Tilpas piktogrammer og tekst, gem eller eksporter historien til print eller deling.</li>
    </ol>

    <h2>Hvad kan du gøre herinde</h2>
    <ul>
        <li>Generere relevante piktogrammer automatisk.</li>
        <li>Bygge trinvise historier og daglige skemaer.</li>
        <li>Tilpasse tekster, rækkefølge og layout.</li>
        <li>Gemme, downloade eller dele piktogram-historier med andre.</li>
    </ul>

    <button on:click={goToCreate}>Kom i gang ✨</button>
</div>

<style>
    .home-container { max-width: 800px; margin: 40px auto; padding: 20px; color: #333; line-height: 1.6; text-align: left; }
    h1 { color: #c9a0dc; margin-bottom: 10px; }
    h2 { margin-top: 20px; color: #444; }
    ol, ul { margin-left: 1.2rem; }
    button { background: #c9a0dc; color: white; border: none; padding: 10px 18px; border-radius: 25px; cursor: pointer; margin-top: 20px; font-weight: bold; }
</style>
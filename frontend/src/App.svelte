<script>
    import { onMount } from 'svelte';
    import Home from './pages/Home.svelte';
    import CreateStory from './pages/CreateStory.svelte';
    import CreateSchedule from './pages/CreateSchedule.svelte';
    import About from './pages/About.svelte';
    import ViewSchedule from './pages/ViewSchedule.svelte';
    
    import { currentPage } from './stores/pageStore.js';

    // Variabel til at holde skema-ID'et hvis vi er på ViewSchedule siden
    /** @type {string | null} */
    let currentScheduleId = null;

    // --- EN SIMPEL ROUTER ---
    function handleHashChange() {
        const hash = window.location.hash;
        
        // Tjekker om URL'en starter med #/view-schedule/
        if (hash.startsWith('#/view-schedule/')) {
            // Udtrækker ID'et (fx "7" fra "#/view-schedule/7")
            currentScheduleId = hash.replace('#/view-schedule/', '');
            // Skift visningen til ViewSchedule
            currentPage.set('view-schedule');
        }
        // Lyt også efter edit links: #/create-schedule?edit=7
        else if (hash.startsWith('#/create-schedule')) {
            currentScheduleId = null;
            currentPage.set('create-schedule');
        }
        else if (hash.startsWith('#/create-story')) {
            currentScheduleId = null;
            currentPage.set('create-story');
        }
        else if (hash.startsWith('#/about')) {
            currentScheduleId = null;
            currentPage.set('about');
        }
        else {
            currentScheduleId = null;
            currentPage.set('home');
        }
    }

    onMount(() => {
        // Tjek URL'en når siden loader første gang
        handleHashChange(); 
        
        // Lyt efter at brugeren trykker frem/tilbage eller på et link
        window.addEventListener('hashchange', handleHashChange);
        
        return () => window.removeEventListener('hashchange', handleHashChange);
    });
    
    /** @param {string} page */
    function navigate(page) {
        $currentPage = page;

        if (page === 'home') {
            window.location.hash = '#/home';
        } else if (page === 'create-story') {
            window.location.hash = '#/create-story';
        } else if (page === 'create-schedule') {
            window.location.hash = '#/create-schedule';
        } else if (page === 'about') {
            window.location.hash = '#/about';
        }
    }
</script>

<div class="app-shell">
    <header>
        <div class="branding">
            <img src="./images/pictograms.png" alt="Logo" class="site-logo" />
            
            <h1 class="site-title">
                <a href="/" on:click|preventDefault={() => navigate('home')}>
                    PictoBuddy
                </a>
            </h1>

        </div>

        <nav>
            <button on:click={() => navigate('home')} class:active={$currentPage === 'home'}>
                Hjem
            </button>
            
            <button on:click={() => navigate('create-story')} class:active={$currentPage === 'create-story'}>
                Ny Historie
            </button>
            
            <button on:click={() => navigate('create-schedule')} class:active={$currentPage === 'create-schedule'}>
                Nyt Ugeskema
            </button>
        </nav>
    </header>

    <main>
        <div class="content-card">
            {#key $currentPage} 
                {#if $currentPage === 'home'}
                    <Home />
                {:else if $currentPage === 'create-story'}
                    <CreateStory />
                {:else if $currentPage === 'create-schedule'}
                    <CreateSchedule />
                {:else if $currentPage === 'about'}
                    <About />
                {:else if $currentPage === 'view-schedule'}
                    <ViewSchedule id={currentScheduleId ?? ''} />
                {/if}
            {/key}
        </div>
    </main>

    <footer>
        <div class="footer-inner">
            <div class="footer-left">
                <a href="https://arasaac.org/" target="_blank" rel="noreferrer" aria-label="Open ARASAAC website">
                    <img src="/images/arasaac-logo.png" alt="ARASAAC logo" class="arasaac-logo" />
                </a>
            </div>

            <div class="footer-center">
                <p>
                    Copyright © 2026 PictoBuddy
                </p>
            </div>

            <div class="footer-right">
                <a href="#/about" on:click|preventDefault={() => navigate('about')}>About & License</a>
            </div>
        </div>
    </footer>
</div>

<style>
    :global(body) {
        font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        min-height: 100vh;
        background: #f7f7fb;
    }

    .app-shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    header {
        background-color: white;
        padding: 1.2rem 2rem;
        box-shadow: 0 2px 8px rgba(255, 107, 107, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        border-bottom: 3px solid #FFE66D;
        
        width: 100%;
        position: sticky; 
        top: 0;
        z-index: 1000;
    }

    .branding {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0;
        width: auto;
    }

    .site-logo {
        height: 60px;
        width: auto;
    }

    .site-title {
        font-family: inherit;
        margin: 0;
        font-size: 2.5rem;
        color: #c9a0dc;
        letter-spacing: -0.5px;
        font-weight: 750;
    }

    .site-title a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    nav { 
        display: flex; 
        gap: 1rem; 
        padding: 0; 
        justify-content: center;
        flex-wrap: nowrap;
        width: auto;
        background-color: transparent;
        border-top: 0;
    }

    button {
        font-family: inherit;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        border: 2px solid transparent;
        background: #F5F7FA;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 750;
        color: #2C3E50;
        transition: all 0.25s ease;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    button:hover { 
        background-color: #edd666; 
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px #ddc860;
    }

    button.active {
        background-color: #c9a0dc;
        color: white;
        border-color: #b39eb5;
        box-shadow: 0 4px 16px #c9a0dc;
    }

    main {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        width: 90%;
        flex: 1;
    }

    .content-card {
        background: rgba(255, 255, 255, 0.8);
        padding: 20px;
        border-radius: 20px;
    }

    footer {
        margin-top: auto;
        padding: 10px 1.25rem 12px;
        background: rgba(255, 255, 255, 0.85);
        border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.75rem;
        align-items: center;
    }

    .footer-left {
        display: flex;
        align-items: center;
    }

    .arasaac-logo {
        width: 110px;
        max-width: 32vw;
        height: auto;
        flex-shrink: 0;
    }

    .footer-center {
        text-align: center;
    }

    .footer-center p {
        margin: 0;
        color: #4a4a4a;
        font-size: 0.85rem;
        line-height: 1.35;
    }

    .footer-right {
        justify-self: end;
    }

    .footer-right a {
        color: #c9a0dc;
        font-weight: 700;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .footer-right a:hover {
        text-decoration: underline;
    }

    @media print {
        header { display: none !important; }
        footer { display: none !important; }
        .content-card { padding: 0; margin: 0; max-width: 100%; }
        main { background-color: white; padding: 0; }
    }
</style>
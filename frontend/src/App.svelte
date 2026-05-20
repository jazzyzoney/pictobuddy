<script>
    import { currentPage } from './stores/pageStore.js';
    import Home from './pages/Home.svelte';
    import CreateStory from './pages/CreateStory.svelte';
    import CreateSchedule from './pages/CreateSchedule.svelte';
    import ViewSchedule from './pages/ViewSchedule.svelte'; // Husk at importere din nye side!
    import { onMount } from 'svelte';

    // Variabel til at holde skema-ID'et hvis vi er på ViewSchedule siden
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
            currentPage.set('create-schedule');
        }
    }

    onMount(() => {
        // Tjek URL'en når siden loader første gang
        handleHashChange(); 
        
        // Lyt efter at brugeren trykker frem/tilbage eller på et link
        window.addEventListener('hashchange', handleHashChange);
        
        return () => window.removeEventListener('hashchange', handleHashChange);
    });
</script>

<main>
    <nav class="no-print"> <div class="logo">
            <span class="icon">✨</span>
            PictoBuddy
        </div>
        <div class="nav-links">
            <button class:active={$currentPage === 'home'} on:click={() => { window.location.hash = ''; currentPage.set('home'); }}>Hjem</button>
            <button class:active={$currentPage === 'create-story'} on:click={() => { window.location.hash = ''; currentPage.set('create-story'); }}>Ny Historie</button>
            <button class:active={$currentPage === 'create-schedule'} on:click={() => { window.location.hash = '#/create-schedule'; currentPage.set('create-schedule'); }}>Nyt Ugeskema</button>
        </div>
    </nav>

    <div class="content">
        {#if $currentPage === 'home'}
            <Home />
        {:else if $currentPage === 'create-story'}
            <CreateStory />
        {:else if $currentPage === 'create-schedule'}
            <CreateSchedule />
        {:else if $currentPage === 'view-schedule'}
            <ViewSchedule id={currentScheduleId} />
        {/if}
    </div>
</main>

<style>
    /* Global layout */
    main { 
        font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        background-color: #F7F9FB;
        min-height: 100vh;
        color: #2C3E50;
    }
    
    /* Navigation Bar */
    nav { 
        background: white; 
        padding: 1.2rem 2rem; 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
        box-shadow: 0 2px 8px rgba(255, 107, 107, 0.08);
        border-bottom: 3px solid #FFE66D;
    }
    
    .logo { 
        font-size: 1.8rem; 
        font-weight: 800; 
        color: #FF6B6B;
        display: flex; 
        align-items: center; 
        gap: 0.8rem;
        letter-spacing: -0.5px;
    }

    .logo .icon {
        font-size: 2rem;
    }

    /* Menu container - MORE SPACIOUS */
    .nav-links { 
        display: flex; 
        gap: 1rem;
        background: transparent;
        padding: 0;
    }
    
    .nav-links button { 
        background: #F5F7FA;
        border: 2px solid transparent;
        padding: 0.75rem 1.5rem; 
        font-size: 1rem; 
        color: #2C3E50; 
        cursor: pointer; 
        border-radius: 12px; 
        font-weight: 600; 
        transition: all 0.25s ease;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }
    
    .nav-links button:hover { 
        background: #4ECDC4;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(78, 205, 196, 0.25);
    }
    
    /* Active state */
    .nav-links button.active { 
        background: #FF6B6B;
        color: white;
        border-color: #FF5252;
        box-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
    }

    /* Content Area */
    .content { 
        max-width: 1200px; 
        margin: 2rem auto; 
        padding: 0 2rem;
    }

    @media print {
        .no-print { display: none !important; }
        .content { padding: 0; margin: 0; max-width: 100%; }
        main { background-color: white; }
    }
</style>
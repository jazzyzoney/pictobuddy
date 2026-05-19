<script>
    import { currentPage } from './stores/pageStore.js';
    import { user } from './stores/userStore.js';
    import Home from './pages/Home.svelte';
    import Dashboard from './pages/Dashboard.svelte';
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
    // ------------------------

    function handleLogin() {
        user.set({ name: 'Pædagog', role: 'admin' });
    }

    function handleLogout() {
        user.set(null);
        currentPage.set('home');
    }
</script>

<main>
    <nav class="no-print"> <div class="logo">
            <span class="icon">✨</span>
            Pictogram Storyteller
        </div>
        <div class="nav-links">
            <button class:active={$currentPage === 'home'} on:click={() => { window.location.hash = ''; currentPage.set('home'); }}>Hjem</button>
            <button class:active={$currentPage === 'create-story'} on:click={() => { window.location.hash = ''; currentPage.set('create-story'); }}>Ny Historie</button>
            <button class:active={$currentPage === 'create-schedule'} on:click={() => { window.location.hash = '#/create-schedule'; currentPage.set('create-schedule'); }}>Nyt Ugeskema</button>
        </div>
        
        <div class="auth">
            {#if $user}
                <span>Logget ind som {$user.name}</span>
                <button on:click={handleLogout} class="logout-btn">Log ud</button>
            {:else}
                <button on:click={handleLogin} class="login-btn">Log ind</button>
            {/if}
        </div>
    </nav>

    <div class="content">
        {#if $currentPage === 'home'}
            <Home />
        {:else if $currentPage === 'dashboard'}
            <Dashboard />
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
    /* Din eksisterende CSS ... */
    main { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; min-height: 100vh;}
    nav { background: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 2rem;}
    .logo { font-size: 1.5rem; font-weight: bold; color: #2c3e50; display: flex; align-items: center; gap: 0.5rem;}
    .nav-links { display: flex; gap: 1rem; }
    .nav-links button { background: none; border: none; padding: 0.5rem 1rem; font-size: 1rem; color: #666; cursor: pointer; border-radius: 4px; transition: all 0.2s;}
    .nav-links button:hover { background: #f0f2f5; color: #2c3e50; }
    .nav-links button.active { background: #e3f2fd; color: #0d6efd; font-weight: 500;}
    .auth { display: flex; align-items: center; gap: 1rem; }
    .login-btn, .logout-btn { padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 500;}
    .login-btn { background: #0d6efd; color: white; border: none;}
    .login-btn:hover { background: #0b5ed7;}
    .logout-btn { background: white; color: #dc3545; border: 1px solid #dc3545;}
    .logout-btn:hover { background: #dc3545; color: white;}
    .content { max-width: 1200px; margin: 0 auto; padding: 0 2rem;}

    @media print {
        .no-print { display: none !important; }
        .content { padding: 0; margin: 0; max-width: 100%; }
        main { background-color: white; }
    }
</style>
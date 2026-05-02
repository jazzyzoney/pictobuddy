<script>
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';

    let loading = false;
    let scheduleRows = [
        { time: "08:00 - 09:00", mon: "", tue: "", wed: "", thu: "", fri: "" }
    ];
    let generatedSchedule = null;

    function addRow() {
        scheduleRows = [...scheduleRows, { time: "", mon: "", tue: "", wed: "", thu: "", fri: "" }];
    }

    async function generateSchedule() {
        loading = true;
        try {
            const response = await fetch('http://localhost:8080/api/schedules/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rows: scheduleRows }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                generatedSchedule = data.schedule;
                toastr.success("Ugeskema genereret! 📅");
            } else {
                toastr.error("Kunne ikke generere skema.");
            }
        } catch (error) {
            toastr.error("Kunne ikke generere skema.");
        } finally {
            loading = false;
        }
    }

    let scenarios = {
        "school": ["Dansk", "Matematik", "Pause", "Frokost", "Idræt"],
        "home": ["Børste tænder", "Morgenmad", "Lege", "Pause", "Sove"]
    };
    
    let selectedScenario = "school";
    $: activities = scenarios[selectedScenario];
</script>

<main>
    <h1>Lav ugeskema</h1>
    
    <div class="controls">
        <label for="scenario-select">Vælg scenarie:</label>
        <select id="scenario-select" bind:value={selectedScenario}>
            <option value="school">Skole</option>
            <option value="home">Hjemme</option>
        </select>
    </div>
    
    <div class="editor">
        <table>
            <thead>
                <tr>
                    <th>Tid</th>
                    <th>Mandag</th>
                    <th>Tirsdag</th>
                    <th>Onsdag</th>
                    <th>Torsdag</th>
                    <th>Fredag</th>
                </tr>
            </thead>
            <tbody>
                {#each scheduleRows as row, i}
                    <tr>
                        <td><input type="text" bind:value={row.time} placeholder="Tid..."></td>
                        <td>
                        <select bind:value={row.mon}>
                            <option value="">-- Vælg eller skriv --</option>
                            {#each activities as act}
                                <option value={act}>{act}</option>
                            {/each}
                        </select>
                        
                        <input 
                            type="text" 
                            bind:value={row.mon} 
                            placeholder="Egen tekst..." 
                            style="margin-top: 5px; font-size: 0.8rem;"
                        />
                        </td>
                        <td>
                            <select bind:value={row.mon}>
                                <option value="">-- Vælg --</option>
                                {#each activities as act}
                                    <option value={act}>{act}</option>
                                {/each}
                            </select>
                        </td>
                        <td>
                            <select bind:value={row.tue}>
                                <option value="">-- Vælg --</option>
                                {#each activities as act}
                                    <option value={act}>{act}</option>
                                {/each}
                            </select>
                        </td>
                        <td>
                            <select bind:value={row.wed}>
                                <option value="">-- Vælg --</option>
                                {#each activities as act}
                                    <option value={act}>{act}</option>
                                {/each}
                            </select>
                        </td>
                        <td>
                            <select bind:value={row.thu}>
                                <option value="">-- Vælg --</option>
                                {#each activities as act}
                                    <option value={act}>{act}</option>
                                {/each}
                            </select>
                        </td>
                        <td>
                            <select bind:value={row.fri}>
                                <option value="">-- Vælg --</option>
                                {#each activities as act}
                                    <option value={act}>{act}</option>
                                {/each}
                            </select>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        
        <div class="actions">
            <button class="secondary" on:click={addRow}>➕ Tilføj række</button>
            <button on:click={generateSchedule} disabled={loading}>
                {loading ? "Henter billeder..." : "Færdiggør skema ✨"}
            </button>
        </div>
    </div>

    {#if generatedSchedule}
        <div class="final-schedule">
            <div class="grid-header">Tid</div>
            <div class="grid-header">Man</div>
            <div class="grid-header">Tirs</div>
            <div class="grid-header">Ons</div>
            <div class="grid-header">Tors</div>
            <div class="grid-header">Fre</div>

            {#each generatedSchedule as row}
                <div class="time-cell">{row.time}</div>
                {#each ['mon', 'tue', 'wed', 'thu', 'fri'] as day}
                    <div class="pic-cell">
                        {#if row[day]}
                            <img src={row[day].url} alt={row[day].keyword} />
                            <span>{row[day].keyword}</span>
                        {/if}
                    </div>
                {/each}
            {/each}
        </div>
    {/if}
</main>

<style>
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; background: white; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    input, select { width: 100%; border: 1px solid #ddd; padding: 5px; }
    
    .controls { 
        margin-bottom: 20px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 5px;
    }
    
    .controls label { 
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
    }
    
    .controls select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .actions { display: flex; gap: 10px; justify-content: center; margin-bottom: 40px; }
    
    .final-schedule {
        display: grid;
        grid-template-columns: 100px repeat(5, 1fr);
        gap: 5px;
        background: #eee;
        padding: 10px;
        border-radius: 10px;
    }
    
    .grid-header { background: #d63384; color: white; padding: 10px; font-weight: bold; }
    .time-cell { background: #f8f9fa; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
    .pic-cell { background: white; padding: 5px; display: flex; flex-direction: column; align-items: center; min-height: 80px; }
    .pic-cell img { width: 50px; height: 50px; }
    .pic-cell span { font-size: 0.7rem; margin-top: 5px; }
</style>
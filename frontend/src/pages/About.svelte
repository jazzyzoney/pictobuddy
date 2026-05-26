<main class="about-page">
    <section class="hero">
        <img src="/images/arasaac-logo.png" alt="ARASAAC logo" class="arasaac-logo" />
        <div>
            <h1>About and licensing</h1>
            <p>
                PictoBuddy uses pictographic symbols from ARASAAC. The attribution and license below are included to
                make the source and usage terms clear for users, teachers, parents, and anyone exporting the app's
                content.
            </p>
        </div>
    </section>

    <section class="card">
        <h2>Short attribution</h2>
        <p>
            The pictographic symbols used are the property of the Government of Aragón and have been created by
            Sergio Palao for ARASAAC, distributed under Creative Commons License BY-NC-SA.
        </p>
    </section>

    <section class="card">
        <h2>ARASAAC terms of use</h2>
        <p>
            ARASAAC resources are distributed under Creative Commons BY-NC-SA, which allows non-commercial use as
            long as the source, author, origin, and license are cited. Derivative works must be shared under the same
            license.
        </p>
        <p>
            Read the full terms here:
            <a href="https://arasaac.org/terms-of-use" target="_blank" rel="noreferrer">arasaac.org/terms-of-use</a>
        </p>
    </section>

</main>

<style>
    .about-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 20px 0 10px;
        color: #333;
        line-height: 1.6;
    }

    .hero {
        display: flex;
        gap: 1.25rem;
        align-items: center;
        margin-bottom: 1.5rem;
        padding: 1.25rem;
        border-radius: 20px;
        background: linear-gradient(135deg, rgba(201, 160, 220, 0.14), rgba(255, 230, 109, 0.16));
    }

    .arasaac-logo {
        width: 180px;
        max-width: 42vw;
        height: auto;
        flex-shrink: 0;
    }

    h1 {
        margin: 0 0 0.5rem;
        color: #c9a0dc;
    }

    h2 {
        margin: 0 0 0.75rem;
        color: #444;
    }

    .card {
        background: white;
        border-radius: 16px;
        padding: 1.25rem;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        margin-bottom: 1rem;
    }

    a {
        color: #c9a0dc;
        font-weight: 700;
    }

    @media (max-width: 700px) {
        .hero {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
<script>
    export let resource;

    const thematiques = Array.isArray(resource.attributes.thematique) ? 
        resource.attributes.thematique : 
        [resource.attributes.thematique]
</script>

<article>
    <a href={resource.url} target="_blank"><h1>{resource.attributes.phrase_catch}</h1></a>
    <footer>
        <span class="étape">{resource.attributes.etape}</span>
        {#each thematiques as thematique}
            <span class="thematique">{thematique}</span>
        {/each}
    </footer>
</article>

<style>
    article > a{
        text-decoration: none;
        color: inherit;
    }

    h1{
        font-size: 1rem;
        color: #073763; 
        font-weight: bold;   
    }

    h1::after{
        content: ' ';
        display: block;
        width: 30%;
        height: 3px;
        background-color: #073763;
    }

    footer .étape, footer .thematique{
        font-size: 0.6rem;
        padding: 0.2rem;
        border-radius: 0.5rem;

        white-space: nowrap;
    }

    footer .étape{
        background-color: lightseagreen;
    }
    footer .thematique{
        background-color: lightpink;
    }

</style>
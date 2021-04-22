<script>
    import baseUrl from '../baseUrl.js'
    export let resource;

    export let bookmarkResource = undefined;
    export let unbookmarkResource = undefined;
</script>

<article>
    <a href={resource.url}><div class="title"><img src="{baseUrl}/assets/images/newspaper-read-woman.svg" alt="Femme qui lit un livre"/><h1>{resource.phrase_catch}</h1></div></a>
    {#if resource.sous_titre}
        <section class="sous_titre">{resource.sous_titre || ''}</section>
    {/if}
    {#if typeof unbookmarkResource === 'function'}
        <button class="rf-btn rf-btn--secondary" on:click={unbookmarkResource}>🌟 Supprimer</button>
    {/if}
    {#if typeof bookmarkResource === 'function'}
        <button class="rf-btn rf-btn--secondary" on:click={bookmarkResource}>☆ Enregistrer</button>
    {/if}
</article>

<style>
    article{
        border: 2px solid grey;
        border-radius: 0.5rem;
        width: 100%;
        height: 17rem;
        display: flex;
        flex-direction: column;
        background-color: white;
        overflow: hidden;
        justify-content: space-between;
    }

    article > button{
        align-self: center;
        border: none;
        background-color: transparent;
        margin-bottom: 1rem;
        cursor: pointer;
    }

    article > a{
        text-decoration: none;
        color: inherit;
        box-shadow: none;
    }

    .sous_titre{
        display: flex;
        font-size: 16px;
        line-height: 1.5em;
        padding: 0.5rem;
        margin: 0 0 1rem;
        flex: 1;
        overflow: hidden;
    }
    .title{
        display: flex;
        flex-direction: row;
        background-color: hsla(28, 100%, 62.5%, 0.1);    
    }
    img{
        width: 3rem;
        height: 3rem;
        padding: 0.3rem;
    }
    h1{
        font-size: 16px;
        line-height: 1.25em;
        color: hsl(0, 0%, 11.8%);
        font-weight: 400;
        padding-top: 0.4rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .rf-fi-file-line{
        padding: 0.5rem;
    }

    

    h1::after{
        content: ' ';
        display: block;
        width: 30%;
        height: 3px;
        margin-top: 4px;
        color: hsl(0, 0%, 11.8%);
    }

</style>
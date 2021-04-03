<script>
    export let resource;

    export let bookmarkResource = undefined;
    export let unbookmarkResource = undefined;
</script>

<article>
    <a href={resource.url}><div class="title"><span class="rf-fi-file-fill" aria-hidden="true"></span><h1>{resource.phrase_catch}</h1></div></a>
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
        border: 3px solid grey;
        border-radius: 0.5rem;
        width: 100%;
        height: 21rem;
        display: flex;
        flex-direction: column;
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
        font-size: 1rem;
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
    h1{
        font-size: 18px;
        line-height: 1.25em;
        color: hsl(0, 0%, 11.8%);
        font-weight: 400;
        padding-top: 0.4rem;
        padding-right: 0.5rem;
    }
    .rf-fi-file-fill{
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
<script>
    export let resource;

    export let bookmarkResource = undefined;
    export let unbookmarkResource = undefined;
</script>

<article>
    <a href={resource.url}><div class="title"><span class="rf-fi-file-fill" aria-hidden="true"></span><h1>{resource.phrase_catch}</h1></div></a>
    {#if typeof unbookmarkResource === 'function'}
        <button on:click={unbookmarkResource}>🌟</button>
    {/if}
    {#if typeof bookmarkResource === 'function'}
        <button on:click={bookmarkResource}>☆</button>
    {/if}
    {#if resource.sous_titre}
        <section class="sous_titre">{resource.sous_titre || ''}</section>
    {/if}
</article>

<style>
    article{
        position: relative;
        border: 3px solid grey;
        border-radius: 0.5rem;
        width: 100%;
        height: 21rem;
        display: inline-block;
        overflow: hidden;
    }

    article > button{
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        background-color: transparent;

        width: 2rem;
        height: 2rem;
        padding: 0em;
        font-size: 1.2em;

        cursor: pointer;
    }

    article > a{
        text-decoration: none;
        color: inherit;
    }

    .sous_titre{
        font-size: 1rem;
        line-height: 1.5em;
        padding: 0.5rem;
        margin: 0 0 1rem;
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
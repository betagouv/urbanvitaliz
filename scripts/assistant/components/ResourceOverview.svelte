<script>
    export let resource;

    function bookmarkResource(){
        console.log(resource.attributes.phrase_catch);
    }
</script>

<article>
    <a href={resource.url} target="_blank"><h1>{resource.attributes.phrase_catch}</h1></a>
    {#if resource.attributes.phrase_catch.startsWith('A')}
        <button on:click={bookmarkResource}>☆★</button>
    {/if}
    {#if resource.attributes.sous_titre}
        <section class="sous_titre">{resource.attributes.sous_titre || ''}</section>
    {/if}
</article>

<style>
    article{
        position: relative;
        border: 1px solid grey;
        border-radius: 0.5rem;
        padding: 1rem;
    }

    article > button{
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        background-color: transparent;
    }

    article > a{
        text-decoration: none;
        color: inherit;
    }

    .sous_titre{
        font-size: 0.8rem;
        line-height: 1.2em;
        
        border: 2px solid grey;
        background-color: #CCC;
        border-radius: 1rem;
        padding: 0.6em;
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

</style>
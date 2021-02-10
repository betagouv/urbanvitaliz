<script>
    export let resource;

    const thematiques = Array.isArray(resource.attributes.thematique) ? 
        resource.attributes.thematique : 
        [resource.attributes.thematique]
</script>

<article>
    <a href={resource.url} target="_blank"><h1>{resource.attributes.phrase_catch}</h1></a>

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

</style>
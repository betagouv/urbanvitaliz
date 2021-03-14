import {json} from 'd3-fetch';

function fixResource(resource){
    let {etape, thematique} = resource;

    etape = etape.trim()
    const etapeOffset = '1 - '.length
    etape = etape.slice(0, etapeOffset) + etape.charAt(etapeOffset).toUpperCase() + etape.slice(etapeOffset+1)
    resource.etape = etape;

    thematique = Array.isArray(thematique) ? thematique : [thematique];
    thematique = thematique.map(t => {
        t = t.trim()
        return t.charAt(0).toUpperCase() + t.slice(1)
    })
    resource.thematique = thematique;
    
    return resource;
}

export default function getAllResources(){
    return json('./allRessources.json')
    .then(rs => rs.map(fixResource))
}
